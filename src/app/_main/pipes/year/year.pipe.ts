import { PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'year',
})
export class YearPipe implements PipeTransform {
  transform(value: dayjs.Dayjs): any {
    return value.year();
  }
}
