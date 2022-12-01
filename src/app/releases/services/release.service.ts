import { Cache } from '@main/decorators/cache/cache.decorator';
import { Errors } from '@main/interfaces/http-error.interface';
import { ApiService } from '@main/services/api/api.service';
import { BaseService } from '@main/services/base/base.service';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { DialogService } from '@main/services/dialog/dialog.service';
import { Release } from '../interfaces/release.interface';
import { TaskService } from '@tasks/services/task/task.service';

@Injectable({
  providedIn: 'root',
})
export class ReleaseService extends BaseService<
  Errors<
    | 'PROJECT_NOT_FOUND'
    | 'PROJECT_OR_STATUS_NOT_FOUND'
    | 'FORM_VALIDATION_ERROR'
    | 'STATUS_IS_NOT_EMPTY'
  >
> {
  protected override errorCodes = {
    PROJECT_NOT_FOUND: {
      message: $localize`Project not found`,
    },
    PROJECT_OR_STATUS_NOT_FOUND: {
      message: $localize`Project or status not found`,
    },
    FORM_VALIDATION_ERROR: {
      message: $localize`Form validation error`,
    },
    STATUS_IS_NOT_EMPTY: {
      message: $localize`Status is not empty`,
    },
  };

  constructor(
    private injector: Injector,
    private apiService: ApiService,
    private taskService: TaskService,
    private dialogService: DialogService,
  ) {
    super(injector);
  }

  /**
   * Get list of statuses
   * @param projectId Project id needed to create status
   * @returns Request observable with list of statuses
   */
  @Cache()
  public list(projectId: number): Observable<Release[]> {
    return this.apiService.get(`/project/${projectId}/release/`).pipe(
      this.validate({
        404: 'PROJECT_NOT_FOUND',
      }),
    );
  }

  /**
   * Get status information
   * @param statusId Status id needed to get status information
   * @param projectId Project id needed to get status
   * @returns Request observable with the status
   */
  @Cache()
  public get(projectId: number, releaseId: number): Observable<Release> {
    return this.apiService.get(`/project/${projectId}/release/${releaseId}`).pipe(
      this.validate({
        404: 'PROJECT_OR_STATUS_NOT_FOUND',
      }),
    );
  }

  /**
   * Creates new status
   * @param status Status to create
   * @param projectId Project id needed to create status
   * @returns Request observable with the created status
   */
  public create(projectId: number, release: Release): Observable<Release> {
    return this.apiService.post(`/project/${projectId}/release/`, { body: release }).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
        404: 'PROJECT_NOT_FOUND',
      }),
    );
  }

  /**
   * Updates status
   * @param status Status to update
   * @param projectId Project id needed to create status
   * @returns Request observable with the updated status
   */
  public update(projectId: number, release: Release): Observable<Release> {
    return this.apiService
      .put(`/project/${projectId}/release/${release.id}`, { body: release })
      .pipe(
        this.validate({
          400: 'FORM_VALIDATION_ERROR',
          404: 'PROJECT_OR_STATUS_NOT_FOUND',
        }),
      );
  }

  /**
   * Deletes status
   * @param status Status id to delete
   * @param projectId Project id needed to create status
   * @returns Request observable
   */
  public deleteWithConfirmation(projectId: number, releaseId: number): Observable<null> {
    return this.apiService.delete(`/project/${projectId}/release/${releaseId}`).pipe(
      this.validate({
        400: 'STATUS_IS_NOT_EMPTY',
        404: 'PROJECT_OR_STATUS_NOT_FOUND',
      }),
    );
  }

  // public openCreateNewStatusDialog(): Observable<Release> {
  //   return this.dialogService
  //     .open(ReleaseDialog, {
  //       title: $localize`Create new status`,
  //       confirmButtonText: $localize`Create`,
  //     } as ReleaseDialogData)
  //     .afterClosed()
  //     .pipe(filter(Boolean));
  // }

  // /**
  //  * Opens dialog to edit specific status
  //  * @param status Status to update
  //  * @returns Observable with updated status, EMPTY otherwise (when user cancels the dialog)
  //  */
  // public openEditStatusDialog(status: Release): Observable<Release> {
  //   return this.dialogService
  //     .open(ReleaseDialog, {
  //       status,
  //       title: $localize`Edit status`,
  //       confirmButtonText: $localize`Update`,
  //     } as ReleaseDialogData)
  //     .afterClosed()
  //     .pipe(filter(Boolean));
  // }
}
