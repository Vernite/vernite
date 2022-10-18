import { Injectable } from '@angular/core';
import { Task } from '@tasks/interfaces/task.interface';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { ApiService } from '@main/services/api/api.service';
import { Status, StatusWithTasks } from '../interfaces/status.interface';
import { TaskService } from './task.service';
import { StatusDialog, StatusDialogData } from './../../dashboard/dialogs/status/status.dialog';
import { DialogService } from '@main/services/dialog/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
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
  public list(projectId: number): Observable<Status[]> {
    return this.apiService.get(`/project/${projectId}/status/`);
  }

  /**
   * Get status information
   * @param statusId Status id needed to get status information
   * @param projectId Project id needed to get status
   * @returns Request observable with the status
   */
  public get(projectId: number, statusId: number): Observable<Status[]> {
    return this.apiService.get(`/project/${projectId}/status/${statusId}`);
  }

  /**
   * Creates new status
   * @param status Status to create
   * @param projectId Project id needed to create status
   * @returns Request observable with the created status
   */
  public create(projectId: number, status: Status): Observable<Status> {
    return this.apiService.post(`/project/${projectId}/status/`, { body: status });
  }

  /**
   * Updates status
   * @param status Status to update
   * @param projectId Project id needed to create status
   * @returns Request observable with the updated status
   */
  public update(projectId: number, status: Status): Observable<Status> {
    return this.apiService.put(`/project/${projectId}/status/${status.id}`, { body: status });
  }

  /**
   * Deletes status
   * @param status Status id to delete
   * @param projectId Project id needed to create status
   * @returns Request observable
   */
  public delete(projectId: number, status: Status): Observable<null> {
    return this.apiService.delete(`/project/${projectId}/status/${status.id}`);
  }

  public getDefaultStatusList(): Status[] {
    return [
      { id: 1, name: 'To Do', color: 0, ordinal: 0, begin: true, final: false },
      { id: 2, name: 'In Progress', color: 0, ordinal: 1, begin: false, final: false },
      { id: 3, name: 'Done', color: 0, ordinal: 2, begin: false, final: true },
    ];
  }

  public listWithTasks(projectId: number): Observable<StatusWithTasks[]> {
    return combineLatest([this.list(projectId), this.taskService.list(projectId)]).pipe(
      map(([statuses, tasks]) => {
        statuses.forEach((status) => {
          (status as StatusWithTasks).tasks = tasks.filter((task) => task.statusId === status.id);
        });
        return statuses as StatusWithTasks[];
      }),
    );
  }

  public board(projectId: number): Observable<[Task | string, StatusWithTasks[]][]> {
    return combineLatest([this.list(projectId), this.taskService.list(projectId)]).pipe(
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
              tasks: task.subTasks?.filter((subtask) => subtask.statusId === status.id) || [],
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
