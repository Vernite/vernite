import { Cache } from '@main/decorators/cache/cache.decorator';
import { Errors } from '@main/interfaces/http-error.interface';
import { ApiService } from '@main/services/api/api.service';
import { BaseService } from '@main/services/base/base.service';
import { EMPTY, Observable, of, switchMap } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { DialogOutlet, DialogService } from '@main/services/dialog/dialog.service';
import { Release } from '../interfaces/release.interface';
import { TaskService } from '@tasks/services/task/task.service';
import {
  ReleaseDialog,
  ReleaseDialogData,
  ReleaseDialogVariant,
} from '../dialog/release/release.dialog';
import { AlertDialogVariant } from '@main/dialogs/alert/alert.dialog';

/**
 * Release service
 */
@Injectable({
  providedIn: 'root',
})
export class ReleaseService extends BaseService<
  Errors<
    'PROJECT_NOT_FOUND' | 'PROJECT_OR_RELEASE_NOT_FOUND' | 'FORM_VALIDATION_ERROR' | 'CONFLICT'
  >
> {
  protected override errorCodes = {
    PROJECT_NOT_FOUND: {
      message: $localize`Project not found`,
    },
    PROJECT_OR_RELEASE_NOT_FOUND: {
      message: $localize`Project or release not found`,
    },
    FORM_VALIDATION_ERROR: {
      message: $localize`Form validation error`,
    },
    CONFLICT: {
      message: $localize`Conflict`,
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
   * Releases list
   * @param projectId project id
   * @returns releases list
   */
  @Cache()
  public list(projectId: number): Observable<Release[]> {
    return this.apiService.get(`/project/${projectId}/release`).pipe(
      this.validate({
        404: 'PROJECT_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

  /**
   * Get release
   * @param projectId project id
   * @param releaseId release id
   * @returns release
   */
  @Cache()
  public get(projectId: number, releaseId: number): Observable<Release> {
    return this.apiService.get(`/project/${projectId}/release/${releaseId}`).pipe(
      this.validate({
        404: 'PROJECT_OR_RELEASE_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

  /**
   * Create release
   * @param projectId project id
   * @param release release
   * @returns release
   */
  public create(projectId: number, release: Release): Observable<Release> {
    return this.apiService.post(`/project/${projectId}/release`, { body: release }).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
        404: 'PROJECT_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

  /**
   * Update release
   * @param projectId project id
   * @param release release
   * @returns release
   */
  public update(projectId: number, release: Release): Observable<Release> {
    return this.apiService
      .put(`/project/${projectId}/release/${release.id}`, { body: release })
      .pipe(
        this.validate({
          400: 'FORM_VALIDATION_ERROR',
          404: 'PROJECT_OR_RELEASE_NOT_FOUND',
          409: 'CONFLICT',
        }),
      );
  }

  /**
   * Publish release
   * @TODO implement
   * @param projectId project id
   * @param release release
   * @returns release
   */
  public publish(projectId: number, release: Release): Observable<Release> {
    return of(release);
  }

  /**
   * Delete release
   * @param projectId project id
   * @param releaseId release id
   * @returns delete response observable
   */
  public delete(projectId: number, releaseId: number): Observable<void> {
    return this.apiService.delete(`/project/${projectId}/release/${releaseId}`).pipe(
      this.validate({
        404: 'PROJECT_OR_RELEASE_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

  /**
   * Delete release with confirmation
   * @param projectId project id
   * @param release release
   * @returns delete response observable
   */
  public deleteWithConfirmation(projectId: number, release: Release): Observable<void> {
    return this.dialogService
      .confirm({
        title: $localize`Delete release`,
        message: $localize`Are you sure you want to delete release '${release.name}'? This action is irreversible`,
        confirmText: $localize`Delete`,
        cancelText: $localize`Cancel`,
        variant: AlertDialogVariant.IMPORTANT,
      })
      .pipe(
        switchMap((confirmed) => {
          if (!confirmed) return EMPTY;
          return this.delete(projectId, release.id);
        }),
      );
  }

  /**
   * Open create release dialog
   * @param projectId project id
   * @returns release observable
   */
  public openCreateReleaseDialog(projectId: number): Observable<Release> {
    return this.dialogService
      .open(
        ReleaseDialog,
        {
          projectId: projectId,
          variant: ReleaseDialogVariant.CREATE,
        } as ReleaseDialogData,
        { outlet: DialogOutlet.CONTENT_RIGHT },
      )
      .afterClosed()
      .pipe(
        switchMap((release: any) => {
          if (release) {
            return this.create(projectId, release);
          } else {
            return EMPTY;
          }
        }),
      );
  }

  /**
   * Open edit release dialog
   * @param projectId project id
   * @param release release
   * @returns release observable
   */
  public openEditReleaseDialog(projectId: number, release: Release): Observable<Release> {
    return this.dialogService
      .open(
        ReleaseDialog,
        {
          projectId: projectId,
          release: release,
          variant: ReleaseDialogVariant.EDIT,
        } as ReleaseDialogData,
        { outlet: DialogOutlet.CONTENT_RIGHT },
      )
      .afterClosed()
      .pipe(
        switchMap((release: any) => {
          if (release) {
            return this.update(projectId, release);
          } else {
            return EMPTY;
          }
        }),
      );
  }
}
