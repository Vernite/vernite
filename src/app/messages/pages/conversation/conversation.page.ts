import { Message } from './../../interfaces/message.interface';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@ngneat/reactive-forms';
import { UserService } from '../../../auth/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable, shareReplay, BehaviorSubject, tap } from 'rxjs';
import { SlackIntegrationService } from '@messages/services/slack-integration.service';
import { SlackChannel } from '../../interfaces/slack.interface';
import { memoize } from 'lodash-es';

/**
 * Conversation page component
 */
@Component({
  selector: 'conversation-page',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  /** User, the conversation is with */
  public user$ = this.userService.getMyself();

  /** Message form group */
  public form = new FormGroup({
    message: new FormControl(''),
  });

  /** Id of the integration */
  private integrationId!: number;

  /** Id of the channel */
  private channelId!: string;

  /** Conversation object */
  public conversation$ = new BehaviorSubject<Message[]>([]);

  /** Channel object */
  public channel$: Observable<SlackChannel> = EMPTY;

  /** Messages element */
  @ViewChild('messages') messages!: ElementRef<HTMLElement>;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private slackIntegrationService: SlackIntegrationService,
  ) {
    this.getUser = memoize(this.getUser.bind(this));
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ integrationId, channelId }) => {
      this.integrationId = integrationId;
      this.channelId = channelId;

      this.slackIntegrationService
        .getMessages(this.integrationId, this.channelId)
        .pipe(
          map((container) => container.messages),
          tap((val) => this.conversation$.next(val)),
        )
        .subscribe(() => {
          setTimeout(() => {
            if (!this.messages) return;
            this.messages.nativeElement.scrollTop = this.messages.nativeElement.scrollHeight;
          });
          setTimeout(() => {
            if (!this.messages) return;
            this.messages.nativeElement.scrollTop = this.messages.nativeElement.scrollHeight;
          }, 2000);
        });

      this.channel$ = this.slackIntegrationService.getChannel(this.integrationId, this.channelId);

      this.slackIntegrationService.protoMessages(this.channelId).subscribe((message) => {
        this.conversation$.next([message, ...(this.conversation$.value as any)]);
        setTimeout(() => {
          this.messages.nativeElement.scrollTop = this.messages.nativeElement.scrollHeight;
        });
      });
    });
  }

  /**
   * Send message
   */
  sendMessage() {
    this.channel$.subscribe((channel) => {
      this.slackIntegrationService.sendMessage(
        this.form.value.message,
        this.channelId,
        this.integrationId,
        channel.provider,
      );

      this.form.reset();
    });
  }

  /**
   * Get user by id
   * @param userId id of the user
   * @returns user object
   */
  getUser(userId: string) {
    return this.slackIntegrationService.getUser(this.integrationId, userId).pipe(shareReplay(1));
  }

  /**
   * Track by message
   * @param index array index of the message
   * @param message message object
   * @returns unique message identifier
   */
  trackByMessage(index: number, message: Message) {
    return message.id;
  }
}
