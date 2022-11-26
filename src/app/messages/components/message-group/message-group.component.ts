import { Component, HostBinding, Input } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';
import { Message } from '../../interfaces/message.interface';

@Component({
  selector: 'message-group',
  templateUrl: './message-group.component.html',
  styleUrls: ['./message-group.component.scss'],
})
export class MessageGroupComponent {
  @Input() messages: Message[] = [];
  @Input() author!: User;
  @HostBinding('class.self') @Input() isSelf: boolean = false;
}
