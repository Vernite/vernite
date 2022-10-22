import { Component, OnInit } from '@angular/core';
import dayjs, { UnitType } from 'dayjs';
import { DaysGrid, CalendarDay } from './date-picker.model';
import {
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { unixTimestamp } from '../../../interfaces/date.interface';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent extends ControlAccessor<unixTimestamp | null> implements OnInit {
  // TODO: Read this from user settings
  firstDayOfWeek = 1;

  cursor = this.control.value ? dayjs(this.control.value) : dayjs();
  currentDate = dayjs();

  monthNames = dayjs.months();
  weekdaysShort = [
    ...dayjs.weekdaysShort().slice(this.firstDayOfWeek),
    ...dayjs.weekdaysShort().slice(0, this.firstDayOfWeek),
  ];

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  daysGrid = this.calculateDaysGrid();

  private calculateDaysGrid() {
    let pointer = (() => {
      const date = this.cursor.startOf('month');
      const day = date.day();

      return date.subtract(day + 7 - this.firstDayOfWeek, 'day');
    })();

    const daysGrid: DaysGrid = [];

    for (let i = 0; i < 6; i++) {
      daysGrid.push([]);
      for (let j = 0; j < 7; j++) {
        const day: CalendarDay = {
          id: pointer.valueOf(),
          name: pointer.date(),
          isWeekend: pointer.day() === 0 || pointer.day() === 6,
          isFromPreviousMonth: pointer.month() < this.cursor.month(),
          isFromNextMonth: pointer.month() > this.cursor.month(),
          today: pointer.isSame(this.currentDate, 'day'),
          selected: pointer.isSame(dayjs(this.control.value || 0), 'day'),
        };

        daysGrid[i].push(day);

        pointer = pointer.add(1, 'day');
      }
    }

    return daysGrid;
  }

  previousMonth() {
    this.cursor = this.cursor.subtract(1, 'month');
    this.daysGrid = this.calculateDaysGrid();
  }

  nextMonth() {
    this.cursor = this.cursor.add(1, 'month');
    this.daysGrid = this.calculateDaysGrid();
  }

  today() {
    const hours = this.cursor.hour();
    const minutes = this.cursor.minute();

    this.cursor = dayjs();
    this.cursor = this.cursor.set('hour', hours);
    this.cursor = this.cursor.set('minute', minutes);
    this.cursor = this.cursor.set('second', 0);

    this.daysGrid = this.calculateDaysGrid();

    this.control.setValue(this.cursor.valueOf());
  }

  now() {
    const today = dayjs();

    this.cursor = this.cursor.set('hour', today.hour());
    this.cursor = this.cursor.set('minute', today.minute());

    this.control.setValue(this.cursor.valueOf());
  }

  increaseMinutes() {
    this.cursor = this.cursor.add(1, 'minute');
    this.setControlProperties(['hour', 'minute'], [this.cursor.hour(), this.cursor.minute()]);
  }

  decreaseMinutes() {
    this.cursor = this.cursor.subtract(1, 'minute');
    this.setControlProperties(['hour', 'minute'], [this.cursor.hour(), this.cursor.minute()]);
  }

  increaseHours() {
    this.cursor = this.cursor.add(1, 'hour');
    this.setControlProperties(['hour', 'minute'], [this.cursor.hour(), this.cursor.minute()]);
  }

  decreaseHours() {
    this.cursor = this.cursor.subtract(1, 'hour');
    this.setControlProperties(['hour', 'minute'], [this.cursor.hour(), this.cursor.minute()]);
  }

  setControlProperties(propertyNames: UnitType[], values: number[]) {
    let value = dayjs(this.control.value || 0);
    for (let i = 0; i < Math.min(propertyNames.length, values.length); i++) {
      value = value.set(propertyNames[i], values[i]);
    }
    this.control.setValue(value.valueOf());
  }

  onHourChange(event: Event) {
    const value = (event.target as HTMLInputElement)?.valueAsNumber;
    this.cursor = this.cursor.set('hour', value);
  }

  onMinuteChange(event: Event) {
    const value = (event.target as HTMLInputElement)?.valueAsNumber;
    this.cursor = this.cursor.set('minute', value);
  }

  selectDay(day: CalendarDay) {
    if (day.isFromPreviousMonth) {
      this.cursor = this.cursor.subtract(1, 'month');
    } else if (day.isFromNextMonth) {
      this.cursor = this.cursor.add(1, 'month');
    }

    this.cursor = this.cursor.date(day.name);
    this.control.setValue(this.cursor.valueOf());

    this.daysGrid = this.calculateDaysGrid();
  }

  override ngAfterControlInit(): void {
    if (this.control.value) {
      this.cursor = dayjs(this.control.value);
      this.daysGrid = this.calculateDaysGrid();
    }
  }

  override writeValue(value: unixTimestamp | null) {
    super.writeValue(value);
    this.daysGrid = this.calculateDaysGrid();
  }
}
