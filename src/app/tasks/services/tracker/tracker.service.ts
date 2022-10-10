import { Injectable } from '@angular/core';
import { ApiService } from '@main/services/api/api.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackerService {
  constructor(private apiService: ApiService) {}

  stop(taskId: number) {
    return of(true);
  }

  start(taskId: number) {
    return of(true);
  }
}
