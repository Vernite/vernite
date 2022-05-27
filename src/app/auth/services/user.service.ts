import { Injectable } from '@angular/core';
import { ModifyUser } from '@auth/interfaces/user.interface';
import { ApiService } from '@main/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  public edit(modUser: ModifyUser): Observable<ModifyUser> {
    return this.apiService.put(`/auth/edit`, { body: modUser });
  }

  public getMyself() {
    return this.apiService.get(`/auth/me`);
  }
}
