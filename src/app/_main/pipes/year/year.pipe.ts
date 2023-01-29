import { PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { Pipe } from '@angular/core';

/**
 * Year pipe - display year of the passed date
 */
@Pipe({
  name: 'year',
})
export class YearPipe implements PipeTransform {
  /**
   * Display year of the passed date
   * @param value - date to display year
   * @returns year of the passed date
   */
  transform(value: dayjs.Dayjs): any {
    return value.year();
  }
}
