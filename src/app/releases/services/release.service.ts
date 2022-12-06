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

  @Cache()
  public list(projectId: number): Observable<Release[]> {
    return this.apiService.get(`/project/${projectId}/release`).pipe(
      this.validate({
        404: 'PROJECT_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

  @Cache()
  public get(projectId: number, releaseId: number): Observable<Release> {
    return this.apiService.get(`/project/${projectId}/release/${releaseId}`).pipe(
      this.validate({
        404: 'PROJECT_OR_RELEASE_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

  public create(projectId: number, release: Release): Observable<Release> {
    return this.apiService.post(`/project/${projectId}/release`, { body: release }).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
        404: 'PROJECT_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

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

  public publish(projectId: number, release: Release): Observable<Release> {
    return of(release);
  }

  public delete(projectId: number, releaseId: number): Observable<null> {
    return this.apiService.delete(`/project/${projectId}/release/${releaseId}`).pipe(
      this.validate({
        404: 'PROJECT_OR_RELEASE_NOT_FOUND',
        409: 'CONFLICT',
      }),
    );
  }

  public deleteWithConfirmation(projectId: number, release: Release) {
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
