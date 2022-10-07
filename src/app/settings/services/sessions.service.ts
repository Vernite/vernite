import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSession } from 'src/app/settings/interfaces/session.interface';
import { ApiService } from '@main/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  constructor(private apiService: ApiService) {}

  public list(): Observable<UserSession[]> {
    return this.apiService.get(`/session`);
  }

  public delete(id: number) {
    return this.apiService.delete(`/session/${id}`);
  }
}
