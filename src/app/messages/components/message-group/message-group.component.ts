import { Component, HostBinding, Input } from '@angular/core';
import { Message } from '../../interfaces/message.interface';
import { SlackUser } from '../../interfaces/slack.interface';

@Component({
  selector: 'message-group',
  templateUrl: './message-group.component.html',
  styleUrls: ['./message-group.component.scss'],
})
export class MessageGroupComponent {
  @Input() messages: Message[] = [];
  @Input() author?: SlackUser | null;
  @HostBinding('class.self') @Input() isSelf: boolean = false;
}
