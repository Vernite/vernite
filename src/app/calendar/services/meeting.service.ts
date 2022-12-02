import { Errors } from '@main/interfaces/http-error.interface';
import { BaseService } from '@main/services/base/base.service';
import { Injector, Injectable } from '@angular/core';
import { ApiService } from '@main/services/api/api.service';
import { Meeting } from '@calendar/interfaces/meeting.interface';
import { Observable, switchMap, EMPTY } from 'rxjs';
import { DialogService } from '@main/services/dialog/dialog.service';
import { MeetingDialog, MeetingDialogVariant } from './../dialogs/meeting/meeting.dialog';
import { Service } from '@main/decorators/service/service.decorator';
import { AlertDialogVariant } from '@main/dialogs/alert/alert.dialog';

@Service()
@Injectable({
  providedIn: 'root',
})
export class MeetingService extends BaseService<
  Errors<'PROJECT_OR_MEETING_DOES_NOT_EXIST' | 'FORM_VALIDATION_ERROR'>
> {
  protected errorCodes = {
    PROJECT_OR_MEETING_DOES_NOT_EXIST: {
      message: $localize`Project or meeting does not exist`,
    },
    FORM_VALIDATION_ERROR: {
      message: $localize`Form validation error`,
    },
  };

  constructor(
    private injector: Injector,
    private apiService: ApiService,
    private dialogService: DialogService,
  ) {
    super(injector);
  }

  public get(projectId: number, meetingId: number): Observable<Meeting> {
    return this.apiService.get(`/project/${projectId}/meeting/${meetingId}`).pipe(
      this.validate({
        404: 'PROJECT_OR_MEETING_DOES_NOT_EXIST',
      }),
    );
  }

  public update(projectId: number, meeting: Meeting): Observable<Meeting> {
    return this.apiService
      .put(`/project/${projectId}/meeting/${meeting.id}`, { body: meeting })
      .pipe(
        this.validate({
          404: 'PROJECT_OR_MEETING_DOES_NOT_EXIST',
          400: 'FORM_VALIDATION_ERROR',
        }),
      );
  }

  public delete(projectId: number, meetingId: number): Observable<void> {
    return this.apiService.delete(`/project/${projectId}/meeting/${meetingId}`).pipe(
      this.validate({
        404: 'PROJECT_OR_MEETING_DOES_NOT_EXIST',
      }),
    );
  }

  public list(projectId: number): Observable<Meeting[]> {
    return this.apiService.get(`/project/${projectId}/meeting`).pipe(
      this.validate({
        404: 'PROJECT_OR_MEETING_DOES_NOT_EXIST',
      }),
    );
  }

  public create(projectId: number, meeting: Meeting): Observable<Meeting> {
    return this.apiService.post(`/project/${projectId}/meeting`, { body: meeting }).pipe(
      this.validate({
        404: 'PROJECT_OR_MEETING_DOES_NOT_EXIST',
        400: 'FORM_VALIDATION_ERROR',
      }),
    );
  }

  public openNewMeetingDialog(projectId?: number): Observable<Meeting> {
    return this.dialogService
      .open(MeetingDialog, {
        projectId,
        variant: MeetingDialogVariant.CREATE,
      })
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (!result) return EMPTY;

          return this.create(result.projectId, result);
        }),
      );
  }

  public openEditMeetingDialog(projectId: number, meeting: Partial<Meeting>): Observable<Meeting> {
    return this.dialogService
      .open(MeetingDialog, {
        projectId,
        meeting,
        variant: MeetingDialogVariant.EDIT,
      })
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (!result) return EMPTY;

          return this.update(projectId, result);
        }),
      );
  }

  public deleteWithConfirmation(projectId: number, meetingId: number) {
    return this.dialogService
      .confirm({
        title: $localize`Delete meeting`,
        message: $localize`Are you sure you want to delete this meeting? This action is irreversible`,
        confirmText: $localize`Delete`,
        cancelText: $localize`Cancel`,
        variant: AlertDialogVariant.IMPORTANT,
      })
      .pipe(
        switchMap((confirmed) => {
          if (!confirmed) return EMPTY;
          return this.delete(projectId, meetingId);
        }),
      );
  }
}
