import { Injectable } from '@angular/core';
import { ApiService } from '@main/services/api/api.service';
import { TimeTrack } from './../../interfaces/time-track.interface';
import { Observable, switchMap, EMPTY } from 'rxjs';
import { DialogService } from '@main/services/dialog/dialog.service';
import { AlertDialogVariant } from '@main/dialogs/alert/alert.dialog';

@Injectable({
  providedIn: 'root',
})
export class TrackerService {
  constructor(private apiService: ApiService, private dialogService: DialogService) {}

  /**
   * Stops specific time track
   * @param projectId Project id to get time tracks from
   * @param taskId Task id to get time tracks from
   * @returns observable with stopped time track
   */
  stop(projectId: number, taskId: number): Observable<TimeTrack> {
    return this.apiService.post(`/project/${projectId}/task/${taskId}/track/stop`);
  }

  /**
   * Starts specific time track
   * @param projectId Project id to get time tracks from
   * @param taskId Task id to get time tracks from
   * @returns observable with started time track
   * @throws Error if time track is already started
   */
  start(projectId: number, taskId: number): Observable<TimeTrack> {
    return this.apiService.post(`/project/${projectId}/task/${taskId}/track/start`);
  }

  /**
   * Updates existing time track
   * @param projectId Project id to get time tracks from
   * @param taskId Task id to get time tracks from
   * @param track Time track to update
   * @returns observable with updated time track
   */
  update(projectId: number, taskId: number, track: TimeTrack): Observable<TimeTrack> {
    return this.apiService.put(`/project/${projectId}/task/${taskId}/track/${track.id}`, {
      body: track,
    });
  }

  /**
   * Deletes existing time track
   * @param projectId Project id to get time tracks from
   * @param taskId Task id to get time tracks from
   * @param timeTrackId Time track id to delete
   * @returns observable with deleted time track
   */
  delete(projectId: number, taskId: number, trackId: number): Observable<void> {
    return this.apiService.delete(`/project/${projectId}/task/${taskId}/track/${trackId}`);
  }

  /**
   * Creates new time track
   * @param projectId Project id to get time tracks from
   * @param taskId Task id to get time tracks from
   * @param track Time track to create
   * @returns observable with created time track
   */
  create(projectId: number, taskId: number, track: TimeTrack): Observable<TimeTrack> {
    return this.apiService.post(`/project/${projectId}/task/${taskId}/track`, { body: track });
  }

  public deleteWithConfirmation(projectId: number, taskId: number, trackId: number) {
    return this.dialogService
      .confirm({
        title: $localize`Delete time track`,
        message: $localize`Are you sure you want to delete this time track? This action is irreversible`,
        confirmText: $localize`Delete`,
        cancelText: $localize`Cancel`,
        variant: AlertDialogVariant.IMPORTANT,
      })
      .pipe(
        switchMap((confirmed) => {
          if (!confirmed) return EMPTY;
          return this.delete(projectId, taskId, trackId);
        }),
      );
  }
}
