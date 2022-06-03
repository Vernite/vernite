import { Injectable } from '@angular/core';
import { UserWithPrivileges } from '@auth/interfaces/user.interface';
import { GitIntegrationService } from '@dashboard/services/git-integration.service';
import { ProjectService } from '@dashboard/services/project.service';
import { AlertDialogVariant } from '@main/dialogs/alert/alert.dialog';
import { DialogService } from '@main/services/dialog.service';
import { TaskDialog, TaskDialogData, TaskDialogVariant } from '@tasks/dialogs/task/task.dialog';
import { Schedule } from '@tasks/interfaces/schedule.interface';
import * as dayjs from 'dayjs';
import { combineLatest, EMPTY, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { ApiService } from '../../_main/services/api.service';
import { Task, TaskWithAdditionalData } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /**
   * Default constructor with dependency injection.
   * @param apiService ApiService
   */
  constructor(
    private apiService: ApiService,
    private gitIntegrationService: GitIntegrationService,
    private dialogService: DialogService,
    private projectService: ProjectService,
  ) {}

  /**
   * Get list of tasks
   * @param projectId Project id needed to list all tasks
   * @returns Request observable with list of tasks
   */
  public list(projectId: number): Observable<Task[]> {
    return this.apiService.get(`/project/${projectId}/task/`);
  }

  /**
   * Creates new task
   * @param task Task to create
   * @param projectId Project id needed to create task
   * @returns Request observable with the created task
   */
  public create(projectId: number, task: TaskWithAdditionalData): Observable<Task> {
    return this.apiService.post(`/project/${projectId}/task/`, { body: task }).pipe(
      switchMap((newTask) => {
        if (task.connectWithPullRequestOnGitHub) {
          return this.gitIntegrationService.connectGitHubPull(projectId, newTask.id, task.pull);
        } else return of(null);
      }),
      switchMap((newTask) => {
        if (task.connectWithIssueOnGitHub) {
          return this.gitIntegrationService.connectGitHubIssue(projectId, newTask.id, task.issue);
        } else return of(null);
      }),
    );
  }

  /**
   * Updates task
   * @param task Task to update
   * @param projectId Project id needed to update task
   * @returns Request observable with the updated task
   */
  public update(projectId: number, task: TaskWithAdditionalData): Observable<Task> {
    return this.apiService.put(`/project/${projectId}/task/${task.id}`, { body: task }).pipe(
      switchMap((newTask) => {
        if (task.connectWithPullRequestOnGitHub) {
          return this.gitIntegrationService.connectGitHubPull(projectId, newTask.id, task.pull);
        } else return of(null);
      }),
      switchMap((newTask) => {
        if (task.connectWithIssueOnGitHub) {
          return this.gitIntegrationService.connectGitHubIssue(projectId, newTask.id, task.issue);
        } else return of(null);
      }),
    );
  }

  /**
   * Deletes task
   * @param taskId Task id to delete
   * @param projectId Project id needed to delete task
   * @returns Request observable
   */
  public delete(projectId: number, taskId: number): Observable<null> {
    return this.apiService.delete(`/project/${projectId}/task/${taskId}`);
  }

  /**
   * Opens dialog to delete specific task
   * @param projectId Project id needed to delete task
   * @param task Task to delete
   * @returns Observable with true if task was deleted, EMPTY otherwise (when user cancels the dialog)
   */
  public deleteWithConfirmation(projectId: number, task: Task): Observable<boolean | null> {
    return this.dialogService
      .confirm({
        title: $localize`Delete task "${task.name}"`,
        message: $localize`Are you sure you want to delete this task "${task.name}"?`,
        confirmText: $localize`Delete`,
        cancelText: $localize`Cancel`,
        variant: AlertDialogVariant.IMPORTANT,
      })
      .pipe(
        switchMap((confirmed) => {
          if (confirmed) {
            return this.delete(projectId, task.id).pipe(switchMap(() => of(true)));
          } else {
            return EMPTY;
          }
        }),
      );
  }

  /**
   * Opens dialog to edit specific task
   * @param projectId Project id needed to update task
   * @param task Task to update
   * @returns Observable with updated task, EMPTY otherwise (when user cancels the dialog)
   */
  public openEditTaskDialog(projectId: number, task: Task): Observable<Task | null> {
    return this.dialogService
      .open(TaskDialog, {
        variant: TaskDialogVariant.EDIT,
        projectId,
        task,
      })
      .afterClosed()
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        switchMap((updatedTask: any) => {
          if (updatedTask) {
            return this.update(projectId, updatedTask);
          } else {
            return EMPTY;
          }
        }),
      );
  }

  /**
   * Opens dialog to create new task
   * @returns created task, EMPTY otherwise (when user cancels the dialog)
   */
  public openCreateNewTaskDialog() {
    return this.dialogService
      .open(TaskDialog, {
        variant: TaskDialogVariant.CREATE,
      } as TaskDialogData)
      .afterClosed()
      .pipe(
        switchMap((task: TaskWithAdditionalData) => {
          if (task) {
            return this.create(task.projectId, task);
          } else {
            return EMPTY;
          }
        }),
      );
  }

  /**
   * Opens dialog to create new subtask
   * @param projectId Project id needed to update subtask
   * @param parentTask Parent task id to which attach subtask
   * @returns created subtask, EMPTY otherwise (when user cancels the dialog)
   */
  public openCreateSubtaskDialog(projectId: number, parentTask: Task): Observable<Task | null> {
    return this.dialogService
      .open(TaskDialog, {
        variant: TaskDialogVariant.CREATE,
        projectId: projectId,
        subtask: true,
        task: {
          parentTaskId: parentTask.id,
        },
      })
      .afterClosed()
      .pipe(
        switchMap((newTask: any) => {
          if (newTask) {
            return this.create(projectId, newTask);
          } else {
            return EMPTY;
          }
        }),
      );
  }

  public schedule(projectId: number): Observable<Schedule> {
    return combineLatest([
      this.list(projectId).pipe(take(1)),
      this.projectService.membersList(projectId).pipe(take(1)),
    ]).pipe(
      map(([tasks, members]: [tasks: Task[], members: UserWithPrivileges[]]) => {
        const schedules = [];
        console.log(tasks, members);

        for (const { user } of members) {
          schedules.push({ user, tasks: new Map() });
          schedules.push({ user, tasks: new Map() });
          schedules.push({ user, tasks: new Map() });
        }

        for (const task of tasks) {
          const schedule = schedules[Math.floor(Math.random() * schedules.length)];

          if (task.estimatedDate) {
            schedule.tasks.set(dayjs(task.estimatedDate).format('YYYY-MM-DD'), task);
          } else {
            if (!schedule.tasks.has(null)) schedule.tasks.set(null, []);

            schedule.tasks.get(null).push(task);
          }
        }

        return schedules;
      }),
    );
  }
}
