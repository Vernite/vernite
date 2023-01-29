import { Pipe, PipeTransform } from '@angular/core';
import { unixTimestamp } from '@main/interfaces/date.interface';

/**
 * Pipe to format unix timestamp to time duration string
 * @TODO: Maybe add duration pipe instead of this one
 */
@Pipe({
  name: 'timeTrackTimer',
})
export class TimeTrackTimerPipe implements PipeTransform {
  transform(value: unixTimestamp): any {
    const hours = Math.floor(value / 1000 / 60 / 60);
    const minutes = Math.floor((value / 1000 / 60) % 60);
    const seconds = Math.floor((value / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
