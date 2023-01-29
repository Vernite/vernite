import { PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { Pipe } from '@angular/core';
import { isNumber } from 'lodash-es';
import { unixTimestamp } from '../../interfaces/date.interface';

/**
 * Dayjs format pipe - display dayjs date
 */
@Pipe({
  name: 'dayjsFormat',
})
export class DayjsFormatPipe implements PipeTransform {
  /**
   * Format dayjs date
   * @param value dayjs date to format or unix timestamp
   * @param format format to use
   * @returns formatted date
   */
  transform(value: dayjs.Dayjs | unixTimestamp, format: string): any {
    if (!value) return '';

    if (isNumber(value)) return dayjs(value).format(format);
    return value.format(format);
  }
}
