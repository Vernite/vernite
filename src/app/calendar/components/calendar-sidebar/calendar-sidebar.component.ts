import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as dayjs from 'dayjs';

@UntilDestroy()
@Component({
  selector: 'calendar-sidebar',
  templateUrl: './calendar-sidebar.component.html',
  styleUrls: ['./calendar-sidebar.component.scss'],
})
export class CalendarSidebarComponent implements OnInit {
  @Input() set date(date: dayjs.Dayjs) {
    this.cursor.setValue(date);
  }

  @Output() selectDate = new EventEmitter<dayjs.Dayjs>();

  public cursor = new FormControl<dayjs.Dayjs>();

  constructor() {}

  ngOnInit() {
    this.cursor.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.selectDate.emit(dayjs(value));
    });
  }
}
