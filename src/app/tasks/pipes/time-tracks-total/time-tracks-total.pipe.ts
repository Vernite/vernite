import { Pipe, PipeTransform } from '@angular/core';
import { TimeTrack } from '../../interfaces/time-track.interface';

@Pipe({
  name: 'timeTracksTotal',
})
export class TimeTracksTotalPipe implements PipeTransform {
  transform(value: TimeTrack[] | undefined, format: 'milliseconds' | 'string' = 'string'): any {
    if (!value) return format === 'string' ? '' : 0;

    const milliseconds = value.reduce(
      (acc, track) => acc + ((track.endDate || 0) - track.startDate),
      0,
    );
    if (format === 'milliseconds') {
      return milliseconds;
    } else {
      const hours = Math.floor(milliseconds / 1000 / 60 / 60);
      const minutes = Math.floor((milliseconds / 1000 / 60) % 60);

      return `${hours}h ${minutes}m`;
    }
  }
}
