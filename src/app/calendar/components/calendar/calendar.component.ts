import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '@calendar/interfaces/event.interface';
import * as dayjs from 'dayjs';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Input() date!: dayjs.Dayjs;
  @Output() dateChange = new EventEmitter<dayjs.Dayjs>();

  @Input() events: Event[] = [];

  previousMonth() {
    this.date = this.date.subtract(1, 'month');
    this.dateChange.emit(this.date);
  }

  nextMonth() {
    this.date = this.date.add(1, 'month');
    this.dateChange.emit(this.date);
  }

  today() {
    this.date = dayjs();
    this.dateChange.emit(this.date);
  }

  select(date: dayjs.Dayjs) {
    this.date = date;
    this.dateChange.emit(this.date);
  }
}
