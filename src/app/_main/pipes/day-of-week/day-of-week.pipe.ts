import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'dayOfWeek',
})
export class DayOfWeekPipe implements PipeTransform {
  private weekDays = dayjs.weekdays();

  transform(value: dayjs.Dayjs): any {
    return this.weekDays[value.day()];
  }
}
