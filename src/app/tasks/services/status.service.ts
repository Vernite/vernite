import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/_main/services/api.service';
import { Status } from '../interfaces/status.interface';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private apiService: ApiService) {}

  public list(): Observable<Status[]> {
    return of([
      {
        id: 1,
        name: 'To Do',
        color: 1,
        final: false,
      },
      {
        id: 2,
        name: 'In progress',
        color: 2,
        final: false,
      },
      {
        id: 3,
        name: 'Done',
        color: 3,
        final: true,
      },
    ]);
  }
}
