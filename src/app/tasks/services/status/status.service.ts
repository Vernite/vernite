import { Injectable, Injector } from '@angular/core';
import { Task } from '@tasks/interfaces/task.interface';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { ApiService } from '@main/services/api/api.service';
import { DialogService } from '@main/services/dialog/dialog.service';
import { StatusDialog, StatusDialogData } from '@dashboard/dialogs/status/status.dialog';
import { BaseService } from '@main/services/base/base.service';
import { Errors } from '@main/interfaces/http-error.interface';
import { TaskService } from '../task/task.service';
import { Status, StatusWithTasks } from '@tasks/interfaces/status.interface';
import { Cache } from '@main/decorators/cache/cache.decorator';
import { DataFilter } from '@main/interfaces/filters.interface';

@Injectable({
  providedIn: 'root',
})
export class StatusService extends BaseService<
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
  public list(projectId: number): Observable<Status[]> {
    return this.apiService.get(`/project/${projectId}/status`).pipe(
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
  public get(projectId: number, statusId: number): Observable<Status> {
    return this.apiService.get(`/project/${projectId}/status/${statusId}`).pipe(
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
  public create(projectId: number, status: Status): Observable<Status> {
    return this.apiService.post(`/project/${projectId}/status`, { body: status }).pipe(
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
  public update(projectId: number, status: Status): Observable<Status> {
    return this.apiService.put(`/project/${projectId}/status/${status.id}`, { body: status }).pipe(
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
  public delete(projectId: number, status: Status): Observable<null> {
    return this.apiService.delete(`/project/${projectId}/status/${status.id}`).pipe(
      this.validate({
        400: 'STATUS_IS_NOT_EMPTY',
        404: 'PROJECT_OR_STATUS_NOT_FOUND',
      }),
    );
  }

  public getDefaultStatusList(): Status[] {
    return [
      { name: 'To Do', color: 0, ordinal: 0, begin: true, final: false },
      { name: 'In Progress', color: 0, ordinal: 1, begin: false, final: false },
      { name: 'Done', color: 0, ordinal: 2, begin: false, final: true },
    ];
  }

  public listWithTasks(
    projectId: number,
    filters?: DataFilter<Task>[] | DataFilter<Task>,
  ): Observable<StatusWithTasks[]> {
    return combineLatest([this.list(projectId), this.taskService.list(projectId, filters)]).pipe(
      map(([statuses, tasks]) => {
        statuses.forEach((status) => {
          (status as StatusWithTasks).tasks = tasks.filter((task) => task.statusId === status.id);
        });
        return statuses as StatusWithTasks[];
      }),
    );
  }

  public board(
    projectId: number,
    filters?: DataFilter<Task>[] | DataFilter<Task>,
  ): Observable<[Task | string, StatusWithTasks[]][]> {
    return combineLatest([this.list(projectId), this.taskService.list(projectId, filters)]).pipe(
      map(([statuses, tasks]) => {
        const board: [Task | string, StatusWithTasks[]][] = [];
        const OTHER = ['OTHER', statuses.map((s) => ({ ...s, tasks: [] }))] as [
          string,
          StatusWithTasks[],
        ];

        for (const task of tasks) {
          if (task.subTasks?.length) {
            const statusesWithSubtasks = statuses.map((status) => ({
              ...status,
              tasks: task.subTasks?.filter((subtask: Task) => subtask.statusId === status.id) || [],
            }));
            board.push([task, statusesWithSubtasks]);
          } else {
            let status = OTHER[1].find((status) => status.id === task.statusId)!;
            if (!status.tasks) {
              status.tasks = [];
            }
            status.tasks.push(task);
          }
        }

        board.push(OTHER);
        return board;
      }),
    );
  }

  /**
   * Opens dialog to edit specific status
   * @param status Status to update
   * @returns Observable with updated status, EMPTY otherwise (when user cancels the dialog)
   */
  public openEditStatusDialog(status: Status): Observable<Status> {
    return this.dialogService
      .open(StatusDialog, {
        status,
        title: $localize`Edit status`,
        confirmButtonText: $localize`Update`,
      } as StatusDialogData)
      .afterClosed()
      .pipe(filter(Boolean));
  }

  /**
   * Opens dialog to create new task
   * @returns created task, EMPTY otherwise (when user cancels the dialog)
   */
  public openCreateNewStatusDialog(): Observable<Status> {
    return this.dialogService
      .open(StatusDialog, {
        title: $localize`Create new status`,
        confirmButtonText: $localize`Create`,
      } as StatusDialogData)
      .afterClosed()
      .pipe(filter(Boolean));
  }
}
