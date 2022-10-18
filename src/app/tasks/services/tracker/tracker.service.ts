import { Injectable } from '@angular/core';
import { ApiService } from '@main/services/api/api.service';
import { TimeTrack } from './../../interfaces/time-track.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackerService {
  constructor(private apiService: ApiService) {}

  stop(projectId: number, taskId: number): Observable<TimeTrack> {
    return this.apiService.post(`/project/${projectId}/task/${taskId}/track/stop`);
  }

  start(projectId: number, taskId: number): Observable<TimeTrack> {
    return this.apiService.post(`/project/${projectId}/task/${taskId}/track/start`);
  }

  update(projectId: number, taskId: number, track: TimeTrack): Observable<TimeTrack> {
    return this.apiService.put(`/project/${projectId}/task/${taskId}/track/${track.id}`);
  }

  delete(projectId: number, taskId: number, trackId: number): Observable<void> {
    return this.apiService.delete(`/project/${projectId}/task/${taskId}/track/${trackId}`);
  }
}
