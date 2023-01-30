import { Component, HostBinding, Input } from '@angular/core';
import { Message } from '../../interfaces/message.interface';
import { SlackUser } from '../../interfaces/slack.interface';

/**
 * Message group component
 */
@Component({
  selector: 'message-group',
  templateUrl: './message-group.component.html',
  styleUrls: ['./message-group.component.scss'],
})
export class MessageGroupComponent {
  /** Array of messages to display in group */
  @Input() messages: Message[] = [];

  /** Author of message group */
  @Input() author?: SlackUser | null;

  /** Flag if message group is from self */
  @HostBinding('class.self') @Input() isSelf: boolean = false;
}
