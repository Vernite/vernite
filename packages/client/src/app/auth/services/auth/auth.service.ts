import { Injectable, Injector } from '@angular/core';
import { Service } from '@main/decorators/service/service.decorator';
import dayjs from 'dayjs';
import { tap, Observable, switchMap, catchError, map, of, EMPTY } from 'rxjs';
import { ApiService } from '@main/services/api/api.service';
import { BaseService } from '@main/services/base/base.service';
import { Errors } from '@main/interfaces/http-error.interface';
import { User } from '../../interfaces/user.interface';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ProtoService } from '@main/services/proto/proto.service';
import { AlertDialogVariant } from '@main/dialogs/alert/alert.dialog';
import { DialogService } from '@main/services/dialog/dialog.service';
import { Cache } from '../../../_main/decorators/cache/cache.decorator';
import { ChangePasswordDialog } from '../../../settings/dialog/change-password/change-password.dialog';

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

  constructor(
    private injector: Injector,
    private apiService: ApiService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private protoService: ProtoService,
    private dialogService: DialogService,
  ) {
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
  }: {
    email: string;
    password: string;
    name: string;
    surname: string;
    username: string;
  }) {
    return this.recaptchaV3Service.execute('register').pipe(
      switchMap((captcha) =>
        this.apiService.post(`/auth/register`, {
          body: { email, password, name, surname, username, captcha },
        }),
      ),
    );
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
  }: {
    email: string;
    password: string;
    remember: boolean;
  }): Observable<User> {
    return this.recaptchaV3Service.execute('login').pipe(
      switchMap((captcha) =>
        this.apiService.post(`/auth/login`, { body: { email, password, remember, captcha } }),
      ),
      tap(() => {
        localStorage.setItem('logged', 'true');
        localStorage.setItem('lastLoginTry', dayjs().valueOf().toString());

        this.protoService.connect();
      }),
    );
  }

  /**
   * Logout (clear cache, clear store, clear cookies)
   * @returns logout response
   */
  public logout() {
    this.clearCache();
    this.protoService.disconnect();

    return this.apiService.post(`/auth/logout`).pipe(
      tap(() => {
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
  public setNewPasswordFromToken(token: string, password: string) {
    return this.apiService.post(`/auth/password/reset`, { body: { token, password } });
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return this.apiService.post(`/auth/password/change`, { body: { oldPassword, newPassword } });
  }

  public openChangePasswordDialog() {
    return this.dialogService.open(ChangePasswordDialog, {}).afterClosed();
  }

  /**
   * Delete account
   * @returns delete account response
   */
  public sendEmailToDeleteAccount() {
    return this.apiService.delete(`/auth/delete`);
  }

  /**
   * Delete account with confirmation
   */
  public deleteAccountWithConfirmation(): Observable<void> {
    return this.dialogService
      .confirm({
        title: $localize`Delete account`,
        message: $localize`Upon proceeding, an email with a deletion link will be send to your email account. To delete account you will need to click given link. Are you sure you want to proceed with deleting your account? Please note that this action will log you out.`,
        confirmText: $localize`Delete`,
        cancelText: $localize`Cancel`,
        variant: AlertDialogVariant.IMPORTANT,
      })
      .pipe(
        switchMap((confirmed) => {
          if (!confirmed) return EMPTY;
          return this.sendEmailToDeleteAccount().pipe(
            switchMap(() => {
              return this.logout();
            }),
          );
        }),
      );
  }

  /**
   * Delete account confirmation
   * @param token delete account token received by email
   * @returns delete account confirmation response
   */
  public deleteAccount(token: string) {
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
   * When user is logged in API, but not logged in frontend - use this function
   */
  public syncSessionFromBackend() {
    localStorage.setItem('logged', 'true');
    this.protoService.connect();
  }

  /**
   * If user is logged in (check only frontend local storage)
   * @returns true if user is logged in
   */
  public isLocallyLoggedIn(): boolean {
    if (localStorage.getItem('logged')) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * If user is logged in
   * @returns true if user is logged in
   */
  @Cache()
  public isLoggedIn(): Observable<boolean> {
    return this.apiService.get(`/auth/me`).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  /**
   * Clear cache
   */
  public clearCache() {
    this.store.clear();
    localStorage.removeItem('logged');
  }

  /**
   * Get last login time
   * @returns last login time
   */
  public getLastLoginTryTime() {
    return dayjs(Number(localStorage.getItem('lastLoginTry') || 0));
  }
}
