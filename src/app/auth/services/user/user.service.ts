import { Injectable, Injector } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { Event } from '@calendar/interfaces/event.interface';
import { Cache } from '@main/decorators/cache/cache.decorator';
import { ErrorCodes, Errors } from '@main/interfaces/http-error.interface';
import { ApiService } from '@main/services/api/api.service';
import { BaseService } from '@main/services/base/base.service';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { unixTimestamp } from '../../../_main/interfaces/date.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<Errors<any>> {
  protected errorCodes: ErrorCodes<any> = {};

  private userData$?: Observable<User>;

  constructor(
    private injector: Injector,
    private apiService: ApiService,
    private authService: AuthService,
  ) {
    super(injector);
  }

  public getUserDefaultPreferences() {
    return {
      dateFormat: 'DD.MM.YYYY',
      timeFormat: 'HH:mm',
      firstDayOfWeek: 1,
    };
  }

  public update(user: Partial<User>): Observable<User> {
    return this.apiService.put(`/auth/edit`, { body: user });
  }

  public getMyself(): Observable<User> {
    if (this.userData$) return this.userData$;
    this.userData$ = this.apiService.get(`/auth/me`).pipe(
      map((user) => Object.assign({}, this.getUserDefaultPreferences(), user)),
      shareReplay(1),
    );

    return this.userData$;
  }

  public getDateFormat(): Observable<string> {
    return this.getMyself().pipe(map((user: User) => user.dateFormat));
  }

  public clearCache(): void {
    this.authService.clearCache();
  }

  public isLocallyLogged(): boolean {
    return Boolean(localStorage.getItem('logged'));
  }

  @Cache()
  public events(from: unixTimestamp, to: unixTimestamp): Observable<Event[]> {
    return this.apiService
      .get(`/auth/me/events`, {
        params: { from, to },
      })
      .pipe(this.validate({}));
  }
}
