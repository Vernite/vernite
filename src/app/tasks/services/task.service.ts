import { Injectable } from '@angular/core';
import { GitIssue, GitPull } from '@dashboard/interfaces/git-integration.interface';
import { GitIntegrationService } from '@dashboard/services/git-integration.service';
import { AlertDialogVariant } from '@main/dialogs/alert/alert.dialog';
import { DialogService } from '@main/services/dialog.service';
import { TaskDialog, TaskDialogVariant } from '@tasks/dialogs/task/task.dialog';
import { EMPTY, Observable, of, switchMap } from 'rxjs';
import { ApiService } from '../../_main/services/api.service';
import { Task } from '../interfaces/task.interface';

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
  public create(
    projectId: number,
    task: Task & {
      issueNumber?: number;
      connectWithIssueOnGitHub: boolean;
      connectWithPullRequestOnGitHub: boolean;
      pull: GitPull;
      issue: GitIssue;
    },
  ): Observable<Task> {
    return this.apiService.post(`/project/${projectId}/task/`, { body: task }).pipe(
      switchMap((newTask) => {
        if (task.connectWithPullRequestOnGitHub) {
          return this.gitIntegrationService.connectGitHubPull(projectId, newTask.id, task.pull);
        } else return EMPTY;
      }),
      switchMap((newTask) => {
        if (task.connectWithIssueOnGitHub) {
          return this.gitIntegrationService.connectGitHubIssue(projectId, newTask.id, task.issue);
        } else return EMPTY;
      }),
    );
  }

  /**
   * Updates task
   * @param task Task to update
   * @param projectId Project id needed to update task
   * @returns Request observable with the updated task
   */
  public update(
    projectId: number,
    task: Task & {
      issueNumber?: number;
      connectWithIssueOnGitHub?: boolean;
      connectWithPullRequestOnGitHub?: boolean;
      pull?: GitPull;
      issue?: GitIssue;
    },
  ): Observable<Task> {
    return this.apiService.put(`/project/${projectId}/task/${task.id}`, { body: task }).pipe(
      switchMap((newTask) => {
        if (task.connectWithPullRequestOnGitHub) {
          return this.gitIntegrationService.connectGitHubPull(projectId, newTask.id, task.pull);
        } else return EMPTY;
      }),
      switchMap((newTask) => {
        if (task.connectWithIssueOnGitHub) {
          return this.gitIntegrationService.connectGitHubIssue(projectId, newTask.id, task.issue);
        } else return EMPTY;
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
            return of(null);
          }
        }),
      );
  }

  public openEditTaskDialog(projectId: number, task: Task): Observable<Task | null> {
    return this.dialogService
      .open(TaskDialog, {
        variant: TaskDialogVariant.EDIT,
        projectId,
        task,
      })
      .afterClosed()
      .pipe(
        switchMap((updatedTask: any) => {
          if (updatedTask) {
            return this.update(projectId, updatedTask);
          } else {
            return of(null);
          }
        }),
      );
  }
}
