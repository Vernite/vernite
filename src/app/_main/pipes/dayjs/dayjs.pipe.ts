import { PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { Pipe } from '@angular/core';
import { isNumber } from 'lodash-es';

@Pipe({
  name: 'dayjs',
})
export class DayjsPipe implements PipeTransform {
  transform(value: any, format?: string): any {
    if (format) {
      return dayjs(value).format(format);
    } else if (value) {
      if (isNumber(value)) {
        return dayjs(value);
      } else {
        return dayjs(value);
      }
    } else {
      return null;
    }
  }
}
