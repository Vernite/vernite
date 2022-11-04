import { Component, OnInit } from '@angular/core';

import { ControlAccessor } from '@main/classes/control-accessor.class';
import { unixTimestamp } from '../../../interfaces/date.interface';

@Component({
  selector: 'date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
})
export class DateTimePickerComponent
  extends ControlAccessor<unixTimestamp | null>
  implements OnInit {}
