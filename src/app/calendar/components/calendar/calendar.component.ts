import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '@calendar/interfaces/event.interface';
import * as dayjs from 'dayjs';

/**
 * Calendar component
 */
@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  /** Date to display */
  @Input() date!: dayjs.Dayjs;

  /** Date change event emitter */
  @Output() dateChange = new EventEmitter<dayjs.Dayjs>();

  /** Events to display */
  @Input() events: Event[] = [];

  /** Move to previous month */
  previousMonth() {
    this.date = this.date.subtract(1, 'month');
    this.dateChange.emit(this.date);
  }

  /** Move to next month */
  nextMonth() {
    this.date = this.date.add(1, 'month');
    this.dateChange.emit(this.date);
  }

  /** Move to today */
  today() {
    this.date = dayjs();
    this.dateChange.emit(this.date);
  }

  /** Select date */
  select(date: dayjs.Dayjs) {
    this.date = date;
    this.dateChange.emit(this.date);
  }
}
