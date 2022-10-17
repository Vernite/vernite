import { Injectable } from '@angular/core';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { ApiService } from '@main/services/api/api.service';
import { Sprint } from '../interfaces/sprint.interface';
import { TaskService } from './task.service';
import { DialogOutlet, DialogService } from '@main/services/dialog/dialog.service';
import {
  SprintDialog,
  SprintDialogData,
  SprintDialogVariant,
} from '@tasks/dialogs/sprint/sprint.dialog';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  constructor(
    private apiService: ApiService,
    private taskService: TaskService,
    private dialogService: DialogService,
  ) {}

  /**
   * Get list of statuses
   * @param projectId Project id needed to create status
   * @returns Request observable with list of statuses
   */
  public list(projectId: number): Observable<Sprint[]> {
    return this.apiService.get(`/project/${projectId}/sprint/`);
  }

  /**
   * Get status information
   * @param statusId Status id needed to get status information
   * @param projectId Project id needed to get status
   * @returns Request observable with the status
   */
  public get(projectId: number, sprintId: number): Observable<Sprint[]> {
    return this.apiService.get(`/project/${projectId}/sprint/${sprintId}`);
  }

  /**
   * Creates new status
   * @param status Status to create
   * @param projectId Project id needed to create status
   * @returns Request observable with the created status
   */
  public create(projectId: number, sprint: Sprint): Observable<Sprint> {
    return this.apiService.post(`/project/${projectId}/sprint/`, { body: sprint });
  }

  /**
   * Updates status
   * @param status Status to update
   * @param projectId Project id needed to create status
   * @returns Request observable with the updated status
   */
  public update(projectId: number, sprint: Sprint): Observable<Sprint> {
    return this.apiService.put(`/project/${projectId}/sprint/${sprint.id}`, { body: sprint });
  }

  /**
   * Deletes status
   * @param status Status id to delete
   * @param projectId Project id needed to create status
   * @returns Request observable
   */
  public delete(projectId: number, sprint: Sprint): Observable<null> {
    return this.apiService.delete(`/project/${projectId}/sprint/${sprint.id}`);
  }

  /**
   * Opens dialog to edit specific sprint
   * @param projectId Project id needed to update task
   * @param sprint Sprint to update
   * @returns Observable with updated sprint, EMPTY otherwise (when user cancels the dialog)
   */
  public openEditTaskDialog(projectId: number, sprint: Sprint): Observable<Sprint | null> {
    return this.dialogService
      .open(
        SprintDialog,
        {
          variant: SprintDialogVariant.EDIT,
          projectId,
          sprint,
        } as SprintDialogData,
        DialogOutlet.CONTENT_RIGHT,
      )
      .afterClosed()
      .pipe(
        switchMap((updatedSprint: any) => {
          if (updatedSprint) {
            return this.update(projectId, updatedSprint);
          } else {
            return EMPTY;
          }
        }),
      );
  }

  /**
   * Opens dialog to create new sprint
   * @returns created sprint, EMPTY otherwise (when user cancels the dialog)
   */
  public openCreateNewTaskDialog() {
    return this.dialogService
      .open(
        SprintDialog,
        {
          variant: SprintDialogVariant.CREATE,
        } as SprintDialogData,
        DialogOutlet.CONTENT_RIGHT,
      )
      .afterClosed()
      .pipe(
        switchMap((sprint: Sprint & { projectId: number }) => {
          if (sprint) {
            return this.create(sprint.projectId, sprint);
          } else {
            return EMPTY;
          }
        }),
      );
  }
}
