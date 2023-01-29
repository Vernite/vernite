import { Component, Input } from '@angular/core';
import { unixTimestamp } from '../../../_main/interfaces/date.interface';

/**
 * Message component
 */
@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  /** Message content */
  @Input() content: string = '';

  /** Message timestamp */
  @Input() timestamp: unixTimestamp = 0;

  /** Flag if message is from self */
  @Input() isSelf: boolean = false;
}
