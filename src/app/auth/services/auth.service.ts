import { Injectable } from '@angular/core';
import { Service } from '@main/decorators/service.decorator';
import { ApiService } from 'src/app/_main/services/api.service';

@Service()
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

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
    return this.apiService.post(`/auth/login`, { body: { email, password, remember } });
  }

  public logout() {
    localStorage.removeItem('logged');
    return this.apiService.post(`/auth/logout`, { body: {} });
  }

  public resetPassword({ email }: { email: string }) {
    return this.apiService.post(`/auth/recoverPassword`, { body: { email } });
  }

  public setNewPassword(token: string, password: string) {
    return this.apiService.post(`/auth/resetPassword`, { body: { token, password } });
  }

  public isLoggedIn() {
    if (localStorage.getItem('logged')) {
      return true;
    } else {
      return false;
    }
  }
}
