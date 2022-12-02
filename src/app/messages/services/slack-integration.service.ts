import { Cache } from '@main/decorators/cache/cache.decorator';
import { Errors } from '@main/interfaces/http-error.interface';
import { ApiService } from '@main/services/api/api.service';
import { BaseService } from '@main/services/base/base.service';
import { EMPTY, filter, interval, map, Observable, take, switchMap } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { DialogService } from '@main/services/dialog/dialog.service';
import { AlertDialogVariant } from '@main/dialogs/alert/alert.dialog';
import { MessageContainer } from '@messages/interfaces/message.interface';
import { SlackChannel, SlackIntegration, SlackUser } from '@messages/interfaces/slack.interface';

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
  ) {
    super(injector);
  }

  public slackInstall(): Observable<boolean> {
    const win = window.open('/api/integration/slack/install', '_blank');

    if (!win) throw new Error('This browser does not support window.open');

    return interval(100).pipe(
      map(() => win.closed),
      filter((closed) => closed),
      take(1),
    );
  }

  @Cache()
  public getSlackIntegrations(): Observable<SlackIntegration> {
    return this.apiService.get(`/user/integration/slack`).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
        409: 'CONFLICT',
      }),
    );
  }

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

  @Cache()
  public getMessages(
    slackId: number,
    channelId: string,
    cursor: string,
  ): Observable<MessageContainer> {
    return this.apiService
      .get(`/user/integration/slack/${slackId}/channel/${channelId}`, {
        params: { cursor },
      })
      .pipe(
        this.validate({
          400: 'FORM_VALIDATION_ERROR',
          404: 'INTEGRATION_OR_CHANNEL_NOT_FOUND',
          409: 'CONFLICT',
        }),
      );
  }

  @Cache()
  public getChannels(slackId: number): Observable<SlackChannel> {
    return this.apiService.get(`/user/integration/slack/${slackId}/channel`).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
        404: 'INTEGRATION_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

  public deleteSlackIntegration(slackId: number): Observable<void> {
    return this.apiService.delete(`/user/integration/slack/${slackId}`).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
        404: 'INTEGRATION_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

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
}
