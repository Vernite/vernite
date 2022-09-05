import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { isNumber, isString } from 'lodash-es';
import { unixTimestamp } from '../../interfaces/date.interface';

@Pipe({
  name: 'month',
})
export class MonthPipe implements PipeTransform {
  private monthNames = dayjs.months();

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
