import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { TimeTrack } from '../../interfaces/time-track.interface';
import { TimeTrackTimerPipe } from '../time-track-timer/time-track-timer.pipe';

/**
 * Pipe to calculate duration of single time track entry
 */
@Pipe({
  name: 'timeTrackDuration',
})
export class TimeTrackDurationPipe implements PipeTransform {
  private timeTrackTimer = new TimeTrackTimerPipe();

  transform(value: TimeTrack | undefined): any {
    if (!value) return 0;

    const start = dayjs(value.startDate);
    const end = value.endDate ? dayjs(value.endDate) : dayjs();

    const milliseconds = end.diff(start, 'milliseconds');

    return this.timeTrackTimer.transform(milliseconds);
  }
}
