import { PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { Pipe } from '@angular/core';
import { isNumber } from 'lodash-es';
import { UserService } from '@auth/services/user.service';
import { EMPTY, map } from 'rxjs';

@Pipe({
  name: 'dateByPreferences',
})
export class DateByPreferencesPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  transform(value: any): any {
    if (value) {
      if (isNumber(value)) {
        return this.userService
          .getDateFormat()
          .pipe(map((dateFormat: string) => dayjs.unix(value).format(dateFormat)));
      } else {
        return this.userService
          .getDateFormat()
          .pipe(map((dateFormat: string) => dayjs(value).format(dateFormat)));
      }
    } else {
      return EMPTY;
    }
  }
}
