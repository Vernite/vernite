import { PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { Pipe } from '@angular/core';

/**
 * Dayjs pipe - display dayjs date
 */
@Pipe({
  name: 'dayjs',
})
export class DayjsPipe implements PipeTransform {
  /**
   * Format dayjs date
   * @param value - date to format
   * @param format - format to use
   * @returns formatted date
   */
  transform(value: any, format?: string): any {
    if (format) {
      return dayjs(value).format(format);
    } else if (value) {
      return dayjs(value);
    } else {
      return null;
    }
  }
}
