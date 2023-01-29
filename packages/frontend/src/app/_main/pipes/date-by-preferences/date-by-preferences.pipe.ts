import { PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { Pipe } from '@angular/core';
import { UserService } from '@auth/services/user/user.service';
import { EMPTY, map } from 'rxjs';

/**
 * Date by preferences pipe - display date by user preferences
 */
@Pipe({
  name: 'dateByPreferences',
})
export class DateByPreferencesPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  /**
   * Display date by user preferences
   * @param value unix timestamp in seconds or milliseconds
   * @param format type of input format
   * @returns
   */
  transform(value: any, format: 'milliseconds' | 'seconds' = 'milliseconds'): any {
    if (value) {
      if (format === 'milliseconds') {
        return this.userService
          .getDateFormat()
          .pipe(map((dateFormat: string) => dayjs(value).format(dateFormat)));
      } else if (format === 'seconds') {
        return this.userService
          .getDateFormat()
          .pipe(map((dateFormat: string) => dayjs(value * 1000).format(dateFormat)));
      }
    } else {
      return EMPTY;
    }
  }
}
