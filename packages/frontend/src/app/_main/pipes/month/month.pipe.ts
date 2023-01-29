import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { isNumber, isString } from 'lodash-es';
import { unixTimestamp } from '../../interfaces/date.interface';

/**
 * Month pipe - display month of the passed date
 */
@Pipe({
  name: 'month',
})
export class MonthPipe implements PipeTransform {
  /**
   * Month names
   */
  private monthNames = dayjs.months();

  /**
   * Display month of the passed date
   * @param value - date to display month
   * @returns month of the passed date
   */
  transform(value: number | unixTimestamp | dayjs.Dayjs): any {
    if (isNumber(value)) {
      return this.monthNames[value];
    } else if (isString(value)) {
      return this.monthNames[dayjs(value).month()];
    } else {
      return this.monthNames[value.month()];
    }
  }
}
