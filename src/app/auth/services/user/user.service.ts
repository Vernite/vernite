import { Injectable, Injector } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { Event } from '@calendar/interfaces/event.interface';
import { Cache } from '@main/decorators/cache/cache.decorator';
import { ErrorCodes, Errors } from '@main/interfaces/http-error.interface';
import { ApiService } from '@main/services/api/api.service';
import { BaseService } from '@main/services/base/base.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { unixTimestamp } from '../../../_main/interfaces/date.interface';
import { Service } from '../../../_main/decorators/service/service.decorator';
import { RouterExtensionsService } from '../../../_main/services/router-extensions/router-extensions.service';
import { mergeWith } from 'lodash-es';
import * as dayjs from 'dayjs';

/**
 * User service
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<Errors<any>> {
  protected errorCodes: ErrorCodes<any> = {};

  private dayjs_locales = [
    'af',
    'ar',
    'ar-dz',
    'ar-kw',
    'ar-ly',
    'ar-ma',
    'ar-sa',
    'ar-tn',
    'az',
    'be',
    'bg',
    'bm',
    'bn',
    'bo',
    'br',
    'bs',
    'ca',
    'cs',
    'cv',
    'cy',
    'da',
    'de',
    'de-at',
    'de-ch',
    'dv',
    'el',
    'en',
    'en-au',
    'en-ca',
    'en-gb',
    'en-ie',
    'en-il',
    'en-nz',
    'en-SG',
    'eo',
    'es',
    'es-do',
    'es-us',
    'et',
    'eu',
    'fa',
    'fi',
    'fo',
    'fr',
    'fr-ca',
    'fr-ch',
    'fy',
    'ga',
    'gd',
    'gl',
    'gom-latn',
    'gu',
    'he',
    'hi',
    'hr',
    'hu',
    'hy-am',
    'id',
    'is',
    'it',
    'it-ch',
    'ja',
    'jv',
    'ka',
    'kk',
    'km',
    'kn',
    'ko',
    'ku',
    'ky',
    'lb',
    'lo',
    'lt',
    'lv',
    'me',
    'mi',
    'mk',
    'ml',
    'mn',
    'mr',
    'ms',
    'ms-my',
    'mt',
    'my',
    'nb',
    'ne',
    'nl',
    'nl-be',
    'nn',
    'oc-lnc',
    'pa-in',
    'pl',
    'pt',
    'pt-br',
    'ro',
    'ru',
    'sd',
    'se',
    'si',
    'sk',
    'sl',
    'sq',
    'sr',
    'sr-cyrl',
    'ss',
    'sv',
    'sw',
    'ta',
    'te',
    'tet',
    'tg',
    'th',
    'tl-ph',
    'tlh',
    'tr',
    'tzl',
    'tzm',
    'tzm-latn',
    'ug-cn',
    'uk',
    'ur',
    'uz',
    'uz-latn',
    'vi',
    'x-pseudo',
    'yo',
    'zh-cn',
    'zh-hk',
    'zh-tw',
  ];

  constructor(
    private injector: Injector,
    private apiService: ApiService,
    private authService: AuthService,
    private routerExtensionsService: RouterExtensionsService,
  ) {
    super(injector);
  }

  /**
   * Get default user preferences
   * @returns default user preferences
   */
  public getUserDefaultPreferences() {
    const navigatorLanguage = this.isLanguageValid(navigator.language)
      ? navigator.language
      : 'en-US';
    const urlLanguage = this.isLanguageValid(this.routerExtensionsService.getLanguageFromUrl())
      ? this.routerExtensionsService.getLanguageFromUrl()
      : 'en-US';

    return {
      language: navigatorLanguage || urlLanguage || 'en-US',
      dateFormat: 'DD.MM.YYYY',
      timeFormat: 'HH:mm',
      firstDayOfWeek: 1,
    };
  }

  public mergeUserWithDefaultPreferences(user: User): User {
    return mergeWith(
      {} as any,
      this.getUserDefaultPreferences() as any,
      user as any,
      (a: any, b: any) => {
        if (b === null || b === undefined) {
          return a;
        }
        return b;
      },
    ) as any as User;
  }

  /**
   * Update user
   * @param user user
   * @returns updated user
   */
  public update(user: Partial<User>): Observable<User> {
    return this.apiService.put(`/auth/edit`, { body: user }).pipe(tap(() => this.loadLocale()));
  }

  /**
   * Get user
   * @returns user
   */
  @Cache({ interval: Number.POSITIVE_INFINITY })
  public getMyself(): Observable<User> {
    return this.apiService
      .get(`/auth/me`)
      .pipe(map((user: User) => this.mergeUserWithDefaultPreferences(user)));
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
   * Get user's time format
   */
  @Cache({ interval: Number.POSITIVE_INFINITY })
  public getTimeFormat(): Observable<string> {
    return this.getMyself().pipe(map((user: User) => user.timeFormat));
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

  private isLanguageValid(lang: string | null) {
    if (!lang) return false;
    return ['pl-PL', 'en-GB', 'it-IT', 'es-ES', 'de-DE', 'uk-UA'].includes(lang);
  }

  public loadLocale(): void {
    this.getMyself().subscribe((user: User) => {
      const urlLanguage = this.isLanguageValid(this.routerExtensionsService.getLanguageFromUrl())
        ? this.routerExtensionsService.getLanguageFromUrl()
        : null;
      const userLanguage = this.isLanguageValid(user.language) ? user.language : null;

      if (urlLanguage && userLanguage && userLanguage !== urlLanguage) {
        this.routerExtensionsService.reloadWithLanguage(user.language);
        return;
      }

      let locale = 'en';

      if (this.dayjs_locales.includes(user.language.toLowerCase())) {
        locale = user.language.toLowerCase();
      } else if (this.dayjs_locales.includes(user.language.toLowerCase().split('-')[0])) {
        locale = user.language.toLowerCase().split('-')[0];
      }

      dayjs.updateLocale(locale, {
        weekStart: user.firstDayOfWeek,
      });
      dayjs.locale(locale);

      localStorage.setItem(
        'locale',
        JSON.stringify({
          weekStart: user.firstDayOfWeek,
        }),
      );

      localStorage.setItem('userLocale', locale);
    });
  }
}
