import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { TimeTrack } from '../../interfaces/time-track.interface';
import { TimeTrackTimerPipe } from '../time-track-timer/time-track-timer.pipe';

@Pipe({
  name: 'timeTrackDuration',
})
export class TimeTrackDurationPipe implements PipeTransform {
  private timeTrackTimer = new TimeTrackTimerPipe();

  transform(value: TimeTrack | undefined): any {
    if (!value) return 0;

    const start = dayjs.unix(value.timeStart);
    const end = dayjs.unix(value.timeEnd);

    const milliseconds = end.diff(start, 'milliseconds');

    return this.timeTrackTimer.transform(milliseconds);
  }
}
