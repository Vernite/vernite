import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeTrackTimer',
})
export class TimeTrackTimerPipe implements PipeTransform {
  transform(value: number): any {
    const hours = Math.floor(value / 1000 / 60 / 60);
    const minutes = Math.floor((value / 1000 / 60) % 60);
    const seconds = Math.floor((value / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
