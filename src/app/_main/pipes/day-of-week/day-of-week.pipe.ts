import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

/**
 * Day of week pipe - display day of week
 */
@Pipe({
  name: 'dayOfWeek',
})
export class DayOfWeekPipe implements PipeTransform {
  /**
   * Day of the week names
   */
  private weekDays = dayjs.weekdays();

  /**
   * Display day of week
   * @param value - date to display day of week
   * @returns day of week
   */
  transform(value: dayjs.Dayjs): any {
    return this.weekDays[value.day()];
  }
}
