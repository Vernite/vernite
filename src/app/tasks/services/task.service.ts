import { Injectable } from '@angular/core';
import { GitIntegrationService } from '@dashboard/services/git-integration.service';
import { Observable, of, switchMap } from 'rxjs';
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
    task: Task & { issueNumber?: number; connectWithIssueOnGitHub: boolean },
  ): Observable<Task> {
    return this.apiService.post(`/project/${projectId}/task/`, { body: task }).pipe(
      switchMap((task) => {
        if (task.connectWithIssueOnGitHub) {
          return this.gitIntegrationService.connectGitHubIssue(
            projectId,
            task.id,
            task.issueNumber,
          );
        } else {
          return of(task);
        }
      }),
    );
  }

  /**
   * Updates task
   * @param task Task to update
   * @param projectId Project id needed to update task
   * @returns Request observable with the updated task
   */
  public update(projectId: number, task: Task): Observable<Task> {
    return this.apiService.put(`/project/${projectId}/task/${task.id}`, { body: task });
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
}
