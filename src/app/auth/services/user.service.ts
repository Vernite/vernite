import { Injectable } from '@angular/core';
import { ModifyUser, User } from '@auth/interfaces/user.interface';
import { ApiService } from '@main/services/api.service';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService, private authService: AuthService) {}

  public getUserDefaultPreferences() {
    return {
      dateFormat: 'DD.MM.YYYY HH:mm',
    };
  }

  public update(modUser: ModifyUser): Observable<ModifyUser> {
    return this.apiService.put(`/auth/edit`, { body: modUser });
  }

  public getMyself(): Observable<User> {
    return this.apiService
      .get(`/auth/me`)
      .pipe(map((user) => Object.assign({}, this.getUserDefaultPreferences(), user)));
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
}
