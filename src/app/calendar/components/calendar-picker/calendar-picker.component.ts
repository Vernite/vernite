import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

/**
 * Calendar picker component to display calendar
 */
@Component({
  selector: 'calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss'],
})
export class CalendarPickerComponent implements OnInit {
  /** Date to display */
  @Input() date!: dayjs.Dayjs;

  /** Date cursor */
  public cursor!: dayjs.Dayjs;

  constructor() {}

  ngOnInit() {
    this.cursor = this.date;
  }
}
