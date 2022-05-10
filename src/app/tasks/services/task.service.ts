import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../_main/services/api.service';
import { Status } from '../interfaces/status.interface';
import { Project } from '@dashboard/interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /**
   * Default constructor with dependency injection.
   * @param apiService ApiService
   */
  constructor(private apiService: ApiService) {}

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
  public create(projectId: number, task: Task): Observable<Task> {
    return this.apiService.post(`/project/${projectId}/task/`, { body: task });
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
