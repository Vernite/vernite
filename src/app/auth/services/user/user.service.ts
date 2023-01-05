import { Injectable, Injector } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { Event } from '@calendar/interfaces/event.interface';
import { Cache } from '@main/decorators/cache/cache.decorator';
import { ErrorCodes, Errors } from '@main/interfaces/http-error.interface';
import { ApiService } from '@main/services/api/api.service';
import { BaseService } from '@main/services/base/base.service';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { unixTimestamp } from '../../../_main/interfaces/date.interface';

/**
 * User service
 */
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<Errors<any>> {
  protected errorCodes: ErrorCodes<any> = {};

  constructor(
    private injector: Injector,
    private apiService: ApiService,
    private authService: AuthService,
  ) {
    super(injector);
  }

  /**
   * Get default user preferences
   * @returns default user preferences
   */
  public getUserDefaultPreferences() {
    return {
      dateFormat: 'DD.MM.YYYY',
      timeFormat: 'HH:mm',
      firstDayOfWeek: 1,
    };
  }

  /**
   * Update user
   * @param user user
   * @returns updated user
   */
  public update(user: Partial<User>): Observable<User> {
    return this.apiService.put(`/auth/edit`, { body: user });
  }

  /**
   * Get user
   * @returns user
   */
  @Cache({ interval: Number.POSITIVE_INFINITY })
  public getMyself(): Observable<User> {
    return this.apiService
      .get(`/auth/me`)
      .pipe(map((user) => Object.assign({}, this.getUserDefaultPreferences(), user)));
  }

  /**
   * Get user's date format
   * @returns user's date format
   */
  @Cache({ interval: Number.POSITIVE_INFINITY })
  public getDateFormat(): Observable<string> {
    return this.getMyself().pipe(map((user: User) => user.dateFormat));
  }

  /**
   * Clear cache
   */
  public clearCache(): void {
    this.authService.clearCache();
  }

  /**
   * Check if user is logged in local storage
   */
  public isLocallyLogged(): boolean {
    return Boolean(localStorage.getItem('logged'));
  }

  /**
   * Get user's events
   * @param from start date
   * @param to end date
   * @returns user's events between dates
   */
  @Cache()
  public events(from: unixTimestamp, to: unixTimestamp): Observable<Event[]> {
    return this.apiService
      .get(`/auth/me/events`, {
        params: { from, to },
      })
      .pipe(this.validate({}));
  }
}
