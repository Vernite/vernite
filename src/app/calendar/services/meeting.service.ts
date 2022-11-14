import { ErrorCodes, Errors } from '@main/interfaces/http-error.interface';
import { BaseService } from '@main/services/base/base.service';
import { Injector } from '@angular/core';
import { ApiService } from '@main/services/api/api.service';
import { Meeting } from '@calendar/interfaces/meeting.interface';
import { Observable } from 'rxjs';

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

  constructor(private injector: Injector, private apiService: ApiService) {
    super(injector);
  }

  public get(projectId: number, meetingId: number): Observable<Meeting> {
    return this.apiService.get(`/project/${projectId}/meeting/${meetingId}`).pipe(
      this.validate({
        404: 'PROJECT_OR_MEETING_DOES_NOT_EXIST',
      }),
    );
  }

  public update(projectId: number, meetingId: number, meeting: Meeting): Observable<Meeting> {
    return this.apiService
      .put(`/project/${projectId}/meeting/${meetingId}`, { body: meeting })
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
}
