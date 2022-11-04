import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss'],
})
export class CalendarPickerComponent implements OnInit {
  @Input() date!: dayjs.Dayjs;

  public cursor!: dayjs.Dayjs;

  constructor() {}

  ngOnInit() {
    this.cursor = this.date;
  }
}
