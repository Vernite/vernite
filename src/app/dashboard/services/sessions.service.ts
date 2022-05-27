import { Injectable } from '@angular/core';
import { UserSession } from '@dashboard/interfaces/session.interface';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/_main/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  constructor(private apiService: ApiService) {}

  public list(): Observable<UserSession[]> {
    return this.apiService.get(`/session`);
  }

  public delete(id: UserSession) {
    return this.apiService.get(`/session/${id}`);
  }
}
