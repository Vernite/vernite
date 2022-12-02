import { Component, Input } from '@angular/core';
import { unixTimestamp } from '../../../_main/interfaces/date.interface';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() content: string = '';
  @Input() timestamp: unixTimestamp = 0;
  @Input() isSelf: boolean = false;
}
