import { PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { Pipe } from '@angular/core';
import { isNumber } from 'lodash-es';

@Pipe({
  name: 'dayjsFormat',
})
export class DayjsFormatPipe implements PipeTransform {
  transform(value: dayjs.Dayjs | number, format: string): any {
    if (!value) return '';

    if (isNumber(value)) return dayjs(value).format(format);
    return value.format(format);
  }
}
