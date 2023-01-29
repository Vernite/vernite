import { PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { Pipe } from '@angular/core';
import { UserService } from '@auth/services/user/user.service';
import { EMPTY, map } from 'rxjs';

/**
 * DateTime by preferences pipe - display date with time by user preferences
 */
@Pipe({
  name: 'dateTimeByPreferences',
})
export class DateTimeByPreferencesPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  /**
   * Display date and time by user preferences
   * @param value unix timestamp in seconds or milliseconds
   * @param format type of input format
   * @returns
   */
  transform(value: any, format: 'milliseconds' | 'seconds' = 'milliseconds'): any {
    if (value) {
      if (format === 'milliseconds') {
        return this.userService
          .getMyself()
          .pipe(
            map(({ dateFormat, timeFormat }) => dayjs(value).format(`${dateFormat} ${timeFormat}`)),
          );
      } else if (format === 'seconds') {
        return this.userService
          .getMyself()
          .pipe(
            map(({ dateFormat, timeFormat }) =>
              dayjs(value * 1000).format(`${dateFormat} ${timeFormat}`),
            ),
          );
      }
    } else {
      return EMPTY;
    }
  }
}
