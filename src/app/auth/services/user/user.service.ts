import { Injectable } from '@angular/core';
import { ModifyUser, User } from '@auth/interfaces/user.interface';
import { ApiService } from '@main/services/api/api.service';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService, private authService: AuthService) {}

  private userData$?: Observable<User>;

  public getUserDefaultPreferences() {
    return {
      dateFormat: 'DD.MM.YYYY HH:mm',
    };
  }

  public update(modUser: ModifyUser): Observable<ModifyUser> {
    return this.apiService.put(`/auth/edit`, { body: modUser });
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
}
