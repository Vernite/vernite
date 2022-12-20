import { Cache } from '@main/decorators/cache/cache.decorator';
import { Errors } from '@main/interfaces/http-error.interface';
import { ApiService } from '@main/services/api/api.service';
import { BaseService } from '@main/services/base/base.service';
import { EMPTY, filter, interval, map, Observable, take, switchMap, of, forkJoin } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { DialogService } from '@main/services/dialog/dialog.service';
import { AlertDialogVariant } from '@main/dialogs/alert/alert.dialog';
import { MessageContainer } from '@messages/interfaces/message.interface';
import {
  SlackChannel,
  SlackChannelWithUser,
  SlackIntegration,
  SlackIntegrationWithChannels,
  SlackIntegrationWithChannelsAndUsers,
  SlackUser,
} from '@messages/interfaces/slack.interface';
import { ProtoService } from '../../_main/services/proto/proto.service';
import { vernite } from '@vernite/protobuf';

/** Slack integration service to manage channels and send/receive messages */
@Injectable({
  providedIn: 'root',
})
export class SlackIntegrationService extends BaseService<
  Errors<
    | 'INTEGRATION_OR_CHANNEL_NOT_FOUND'
    | 'FORM_VALIDATION_ERROR'
    | 'CONFLICT'
    | 'INTEGRATION_NOT_FOUND'
  >
> {
  protected override errorCodes = {
    INTEGRATION_NOT_FOUND: {
      message: $localize`Integration not found`,
    },
    INTEGRATION_OR_CHANNEL_NOT_FOUND: {
      message: $localize`Integration or channel not found`,
    },
    FORM_VALIDATION_ERROR: {
      message: $localize`Form validation error`,
    },
    CONFLICT: {
      message: $localize`Conflict`,
    },
  };

  constructor(
    private injector: Injector,
    private apiService: ApiService,
    private dialogService: DialogService,
    private protoService: ProtoService,
  ) {
    super(injector);
  }

  /** Open slack installation page in new tab */
  public slackInstall(): Observable<boolean> {
    const win = window.open('/api/integration/slack/install', '_blank');

    if (!win) throw new Error('This browser does not support window.open');

    return interval(100).pipe(
      map(() => win.closed),
      filter((closed) => closed),
      take(1),
    );
  }

  /** Get user slack integrations list */
  @Cache()
  public getSlackIntegrations(): Observable<SlackIntegration[]> {
    return this.apiService.get(`/user/integration/slack`).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
        409: 'CONFLICT',
      }),
    );
  }

  /** Get slack integration channels list (grouped by installations) */
  @Cache()
  public getSlackIntegrationsWithChannels(): Observable<SlackIntegrationWithChannels[]> {
    return this.getSlackIntegrations().pipe(
      switchMap((integrations) => {
        return forkJoin(
          integrations.map((integration) => {
            return this.getChannels(integration.id).pipe(
              map((channels) => ({
                ...integration,
                channels,
              })),
            );
          }),
        );
      }),
    );
  }

  /** Get slack integration channels list (grouped by installations and joined with users) */
  @Cache()
  public getSlackIntegrationsWithChannelsAndUsers(): Observable<
    SlackIntegrationWithChannelsAndUsers[]
  > {
    return this.getSlackIntegrationsWithChannels().pipe(
      switchMap((integrations) => {
        return forkJoin(
          integrations.map((integration) => {
            return this.getChannelsWithUsers(integration.id).pipe(
              map((channels) => ({
                ...integration,
                channels,
              })),
            );
          }),
        );
      }),
    );
  }

  /**
   * Get slack user by integration id and user id
   * @param slackId Slack integration id
   * @param userId Slack user id
   */
  @Cache()
  public getUser(slackId: number, userId: string): Observable<SlackUser> {
    return this.apiService.get(`/user/integration/slack/${slackId}/user/${userId}`).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
        404: 'INTEGRATION_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

  /**
   * Get messages from slack channel
   * @param slackId Slack integration id
   * @param channelId Slack channel id
   * @param cursor Cursor for pagination
   * @returns Observable with messages container
   */
  @Cache()
  public getMessages(
    slackId: number,
    channelId: string,
    cursor?: string,
  ): Observable<MessageContainer> {
    return this.apiService
      .get(`/user/integration/slack/${slackId}/channel/${channelId}`, {
        params: { ...(cursor ? { cursor } : {}) },
      })
      .pipe(
        this.validate({
          400: 'FORM_VALIDATION_ERROR',
          404: 'INTEGRATION_OR_CHANNEL_NOT_FOUND',
          409: 'CONFLICT',
        }),
      );
  }

  /**
   * Send message to slack channel
   * @param slackId Slack integration id
   * @returns Observable with list of slack channels
   */
  @Cache()
  public getChannels(slackId: number): Observable<SlackChannel[]> {
    return this.apiService.get(`/user/integration/slack/${slackId}/channel`).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
        404: 'INTEGRATION_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

  /**
   * List all channels with users
   * @param slackId Slack integration id
   * @returns list of slack channels joined with users
   */
  public getChannelsWithUsers(slackId: number) {
    return this.getChannels(slackId).pipe(
      switchMap((channels) => {
        return forkJoin(
          channels.map((channel) => {
            if (!channel.user) return of(channel as SlackChannelWithUser);

            return this.getUser(slackId, channel.user).pipe(
              map((user) => ({
                ...channel,
                user,
              })),
            );
          }),
        );
      }),
    );
  }

  /**
   * Get slack channel details by integration id and channel id
   * @param slackId Slack integration id
   * @param channelId Slack channel id
   * @returns Observable with slack channel
   */
  public getChannel(slackId: number, channelId: string): Observable<SlackChannel> {
    // TODO: Move it to other endpoint for optimization
    return this.getChannels(slackId).pipe(
      map((channels) => channels.find((channel) => channel.id === channelId)!),
    );
  }

  /**
   * Get slack channel details (joined with user) by integration id and channel id
   * @param slackId Slack integration id
   * @param channelId Slack channel id
   * @returns Observable with slack channel joined with user
   */
  public getChannelWithUser(slackId: number, channelId: string): Observable<SlackChannelWithUser> {
    return this.getChannel(slackId, channelId).pipe(
      switchMap((channel) => {
        if (!channel) return EMPTY;
        if (!channel.user) return of(channel as SlackChannelWithUser);

        return this.getUser(slackId, channelId).pipe(
          map((user) => ({
            ...channel,
            user,
          })),
        );
      }),
    );
  }

  /**
   * Detach slack integration from user account
   * @param slackId Slack integration id
   * @returns empty observable when the action is successful
   */
  public deleteSlackIntegration(slackId: number): Observable<void> {
    return this.apiService.delete(`/user/integration/slack/${slackId}`).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
        404: 'INTEGRATION_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

  /**
   * Delete slack integration with confirmation dialog
   * @param slackId Slack integration id
   */
  public deleteWithConfirmation(slackId: number) {
    return this.dialogService
      .confirm({
        title: $localize`Delete slack integration`,
        message: $localize`Are you sure you want to delete this slack integration? This action is irreversible`,
        confirmText: $localize`Delete`,
        cancelText: $localize`Cancel`,
        variant: AlertDialogVariant.IMPORTANT,
      })
      .pipe(
        switchMap((confirmed) => {
          if (!confirmed) return EMPTY;
          return this.deleteSlackIntegration(slackId);
        }),
      );
  }

  /**
   * Send message to slack channel
   * @param content Message content
   * @param channelId Slack channel id
   * @param integrationId Slack integration id
   * @param provider Integration provider (in this case it's always `slack`)
   */
  public sendMessage(content: string, channelId: string, integrationId: number, provider: string) {
    const messageObject = new vernite.CommunicatorModel.SendMessage({
      content,
      channel: channelId,
      provider,
      integrationID: integrationId,
    });

    this.protoService.next(messageObject);
  }

  /**
   * Get messages from slack channel (using protobuf channel)
   * @param channelId Slack channel id
   * @returns observable with messages from slack channel
   */
  public protoMessages(channelId: string): Observable<vernite.CommunicatorModel.Message> {
    return this.protoService
      .get<vernite.CommunicatorModel.Message>(vernite.CommunicatorModel.Message)
      .pipe(filter((message) => message.channel === channelId));
  }
}
