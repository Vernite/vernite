import { Injectable, Injector } from '@angular/core';
import { Service } from '@main/decorators/service/service.decorator';
import dayjs from 'dayjs';
import { tap } from 'rxjs';
import { ApiService } from '@main/services/api/api.service';
import { BaseService } from '@main/services/base/base.service';
import { Errors } from '@main/interfaces/http-error.interface';

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
    return this.apiService.post(`/auth/register`, {
      body: { email, password, name, surname, username },
    });
  }

  public login({
    email,
    password,
    remember,
  }: {
    email: string;
    password: string;
    remember: boolean;
  }) {
    return this.apiService
      .post(`/auth/login`, { body: { email, password, remember } })
      .pipe(tap(() => localStorage.setItem('lastLoginTry', dayjs().valueOf().toString())));
  }

  public logout() {
    this.clearCache();
    return this.apiService.post(`/auth/logout`);
  }

  public resetPassword({ email }: { email: string }) {
    return this.apiService.post(`/auth/password/recover`, { body: { email } });
  }

  public setNewPassword(token: string, password: string) {
    return this.apiService.post(`/auth/password/reset`, { body: { token, password } });
  }

  public deleteAccount() {
    return this.apiService.delete(`/auth/delete`);
  }

  public deleteAccountConfirmation(token: string) {
    return this.apiService.delete(`/auth/delete/confirm`, { body: { token } }).pipe(
      this.validate({
        403: 'INVALID_TOKEN',
        404: 'INVALID_TOKEN',
      }),
    );
  }

  public recoverAccount() {
    return this.apiService.post(`/auth/delete/recover`);
  }

  public isLoggedIn() {
    if (localStorage.getItem('logged')) {
      return true;
    } else {
      return false;
    }
  }

  public clearCache() {
    localStorage.removeItem('logged');
  }

  public getLastLoginTime() {
    return dayjs(Number(localStorage.getItem('lastLoginTry') || 0));
  }
}
