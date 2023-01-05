import { Component, Input, OnInit } from '@angular/core';
import dayjs, { UnitType } from 'dayjs';
import { DaysGrid, CalendarDay } from '../date-picker.model';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ControlAccessor } from '@main/classes/control-accessor/control-accessor.class';
import { unixTimestamp } from '../../../interfaces/date.interface';

/**
 * Date picker component
 */
@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent extends ControlAccessor<unixTimestamp | null> implements OnInit {
  /**
   * First day of week
   */
  @Input() firstDayOfWeek = 1;

  /**
   * Flag to hide today button
   */
  @Input() hideTodayButton = false;

  /** Current date cursor */
  cursor = this.control.value ? dayjs(this.control.value) : dayjs();

  /** todays date */
  currentDate = dayjs();

  /** Month names */
  monthNames = dayjs.months();

  /** Weekday names */
  weekdaysShort = [
    ...dayjs.weekdaysShort().slice(this.firstDayOfWeek),
    ...dayjs.weekdaysShort().slice(0, this.firstDayOfWeek),
  ];

  /** @ignore */
  faChevronLeft = faChevronLeft;

  /** @ignore */
  faChevronRight = faChevronRight;

  /** Days grid */
  daysGrid = this.calculateDaysGrid();

  /** Calculate days grid */
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

  /**
   * Move to previous month
   */
  previousMonth() {
    this.cursor = this.cursor.subtract(1, 'month');
    this.daysGrid = this.calculateDaysGrid();
  }

  /**
   * Move to next month
   */
  nextMonth() {
    this.cursor = this.cursor.add(1, 'month');
    this.daysGrid = this.calculateDaysGrid();
  }

  /**
   * Move to today and select it
   */
  today() {
    this.cursor = dayjs();
    this.daysGrid = this.calculateDaysGrid();

    this.control.setValue(this.cursor.valueOf());
  }

  /**
   * Set control properties
   * @param propertyNames unit types
   * @param values values
   */
  setControlProperties(propertyNames: UnitType[], values: number[]) {
    let value = dayjs(this.control.value || 0);
    for (let i = 0; i < Math.min(propertyNames.length, values.length); i++) {
      value = value.set(propertyNames[i], values[i]);
    }
    this.control.setValue(value.valueOf());
  }

  /**
   * Select day
   * @param day day to select
   */
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

    if (value && !dayjs(this.value).isSame(dayjs(this.previousValue))) {
      this.cursor = dayjs(value);
    }
    this.daysGrid = this.calculateDaysGrid();
  }
}
