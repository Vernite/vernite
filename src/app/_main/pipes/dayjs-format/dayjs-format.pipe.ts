import { PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'dayjsFormat',
})
export class DayjsFormatPipe implements PipeTransform {
  transform(value: dayjs.Dayjs, format: string): any {
    return value.format(format);
  }
}
