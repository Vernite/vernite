import { Injectable } from '@angular/core';
import { EMPTY, map, Observable, switchMap, of } from 'rxjs';
import { ApiService } from '@main/services/api/api.service';
import { Sprint } from '../interfaces/sprint.interface';
import { DialogOutlet, DialogService } from '@main/services/dialog/dialog.service';
import {
  SprintDialog,
  SprintDialogData,
  SprintDialogVariant,
} from '@tasks/dialogs/sprint/sprint.dialog';
import { SprintStatus } from '@tasks/enums/sprint-status.enum';
import { DataFilter } from '@main/interfaces/filters.interface';
import { AlertDialogVariant } from '@main/dialogs/alert/alert.dialog';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  constructor(private apiService: ApiService, private dialogService: DialogService) {}

  /**
   * Get list of statuses
   * @param projectId Project id needed to create status
   * @returns Request observable with list of statuses
   */
  public list(
    projectId: number,
    filters?: DataFilter<Sprint, any>[] | DataFilter<Sprint, any>,
  ): Observable<Sprint[]> {
    return this.apiService.get(`/project/${projectId}/sprint`, { filters });
  }

  /**
   * Get status information
   * @param statusId Status id needed to get status information
   * @param projectId Project id needed to get status
   * @returns Request observable with the status
   */
  public get(projectId: number, sprintId: number): Observable<Sprint> {
    return this.apiService.get(`/project/${projectId}/sprint/${sprintId}`);
  }

  /**
   * Creates new status
   * @param status Status to create
   * @param projectId Project id needed to create status
   * @returns Request observable with the created status
   */
  public create(projectId: number, sprint: Sprint): Observable<Sprint> {
    return this.apiService.post(`/project/${projectId}/sprint`, { body: sprint });
  }

  /**
   * Updates status
   * @param status Status to update
   * @param projectId Project id needed to create status
   * @returns Request observable with the updated status
   */
  public update(projectId: number, sprint: Partial<Sprint & { id: number }>): Observable<Sprint> {
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
  public openEditSprintDialog(projectId: number, sprint: Sprint): Observable<Sprint | null> {
    console.log(projectId);
    return this.dialogService
      .open(
        SprintDialog,
        {
          variant: SprintDialogVariant.EDIT,
          projectId,
          sprint,
        } as SprintDialogData,
        {
          outlet: DialogOutlet.CONTENT_RIGHT,
        },
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

  public revertWithConfirmation(projectId: number, sprint: Sprint): Observable<boolean | null> {
    return this.dialogService
      .confirm({
        title: $localize`Revert active sprint "${sprint.name}"`,
        message: $localize`Are you sure you want to revert this sprint "${sprint.name}"?`,
        confirmText: $localize`Revert`,
        cancelText: $localize`Cancel`,
        variant: AlertDialogVariant.DEFAULT,
      })
      .pipe(
        switchMap((confirmed) => {
          if (confirmed) {
            return this.update(projectId, { id: sprint.id, status: SprintStatus.CREATED }).pipe(
              switchMap(() => of(true)),
            );
          } else {
            return EMPTY;
          }
        }),
      );
  }

  public closeWithConfirmation(projectId: number, sprint: Sprint): Observable<boolean | null> {
    return this.dialogService
      .confirm({
        title: $localize`Close sprint "${sprint.name}"`,
        message: $localize`Are you sure you want to close this sprint "${sprint.name}"?`,
        confirmText: $localize`Close`,
        cancelText: $localize`Cancel`,
        variant: AlertDialogVariant.IMPORTANT,
      })
      .pipe(
        switchMap((confirmed) => {
          if (confirmed) {
            return this.update(projectId, { id: sprint.id, status: SprintStatus.CLOSED }).pipe(
              switchMap(() => of(true)),
            );
          } else {
            return EMPTY;
          }
        }),
      );
  }

  public deleteWithConfirmation(projectId: number, sprint: Sprint): Observable<boolean | null> {
    return this.dialogService
      .confirm({
        title: $localize`Delete sprint "${sprint.name}"`,
        message: $localize`Are you sure you want to delete this sprint "${sprint.name}"?`,
        confirmText: $localize`Delete`,
        cancelText: $localize`Cancel`,
        variant: AlertDialogVariant.IMPORTANT,
      })
      .pipe(
        switchMap((confirmed) => {
          if (confirmed) {
            return this.delete(projectId, sprint).pipe(switchMap(() => of(true)));
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
  public openCreateSprintDialog() {
    return this.dialogService
      .open(
        SprintDialog,
        {
          variant: SprintDialogVariant.CREATE,
        } as SprintDialogData,
        {
          outlet: DialogOutlet.CONTENT_RIGHT,
        },
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

  public getActiveSprint(projectId: number): Observable<Sprint | undefined> {
    return this.list(projectId).pipe(
      map((sprintList) => sprintList.find((sprint) => sprint.status === SprintStatus.ACTIVE)),
    );
  }
}
