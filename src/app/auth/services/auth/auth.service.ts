import { Injectable, Injector } from '@angular/core';
import { Service } from '@main/decorators/service/service.decorator';
import dayjs from 'dayjs';
import { tap, Observable } from 'rxjs';
import { ApiService } from '@main/services/api/api.service';
import { BaseService } from '@main/services/base/base.service';
import { Errors } from '@main/interfaces/http-error.interface';
import { User } from '../../interfaces/user.interface';

/**
 * Authentication service
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<Errors<'INVALID_TOKEN'>> {
  protected override errorCodes = {
    INVALID_TOKEN: {
      message: $localize`Invalid token`,
    },
  };

  constructor(private injector: Injector, private apiService: ApiService) {
    super(injector);
  }

  /**
   * Register
   * @param param0 registration details
   * @returns registration response
   */
  public register({
    email,
    password,
    name,
    surname,
    username,
    captcha,
  }: {
    email: string;
    password: string;
    name: string;
    surname: string;
    username: string;
    captcha: string;
  }) {
    return this.apiService.post(`/auth/register`, {
      body: { email, password, name, surname, username, captcha },
    });
  }

  /**
   * Login
   * @param param0 login details
   * @returns login response
   */
  public login({
    email,
    password,
    remember,
    captcha,
  }: {
    email: string;
    password: string;
    remember: boolean;
    captcha: string;
  }): Observable<User> {
    return this.apiService
      .post(`/auth/login`, { body: { email, password, remember, captcha } })
      .pipe(tap(() => localStorage.setItem('lastLoginTry', dayjs().valueOf().toString())));
  }

  /**
   * Logout (clear cache, clear store, clear cookies)
   * @returns logout response
   */
  public logout() {
    this.clearCache();
    this.store.clear();
    return this.apiService.post(`/auth/logout`).pipe(
      tap(() => {
        this.clearCache();
        this.store.clear();
        document.cookie = '';
      }),
    );
  }

  /**
   * Reset password (recover account)
   * @param param0 email
   * @returns reset password response
   */
  public resetPassword({ email }: { email: string }) {
    return this.apiService.post(`/auth/password/recover`, { body: { email } });
  }

  /**
   * Set new password
   * @param token reset password token received by email
   * @param password new password
   * @returns set new password response
   */
  public setNewPassword(token: string, password: string) {
    return this.apiService.post(`/auth/password/reset`, { body: { token, password } });
  }

  /**
   * Delete account
   * @returns delete account response
   */
  public deleteAccount() {
    return this.apiService.delete(`/auth/delete`);
  }

  /**
   * Delete account confirmation
   * @param token delete account token received by email
   * @returns delete account confirmation response
   */
  public deleteAccountConfirmation(token: string) {
    return this.apiService.delete(`/auth/delete/confirm`, { body: { token } }).pipe(
      this.validate({
        403: 'INVALID_TOKEN',
        404: 'INVALID_TOKEN',
      }),
    );
  }

  /**
   * Recover account after deletion
   * @returns recover account response
   */
  public recoverAccount() {
    return this.apiService.post(`/auth/delete/recover`);
  }

  /**
   * If user is logged in
   * @returns true if user is logged in
   */
  public isLoggedIn() {
    if (localStorage.getItem('logged')) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Clear cache
   */
  public clearCache() {
    localStorage.removeItem('logged');
  }

  /**
   * Get last login time
   * @returns last login time
   */
  public getLastLoginTime() {
    return dayjs(Number(localStorage.getItem('lastLoginTry') || 0));
  }
}
