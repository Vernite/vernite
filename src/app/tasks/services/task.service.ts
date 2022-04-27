import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../_main/services/api.service';
import { Status } from '../interfaces/status.interface';

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
   * @returns Request observable with the columns tree of tasks
   */
  public tree(): Observable<Status[]> {
    return of([] as Status[]);
  }

  /**
   * Creates new task
   * @param task Task to create
   * @returns Request observable with the created task
   */
  public create(task: Task): Observable<Task> {
    return this.apiService.post('/tasks', { body: task });
  }

  /**
   * Updates task
   * @param task Task to update
   * @returns Request observable with the updated task
   */
  public update(task: Task): Observable<Task> {
    return this.apiService.patch(`/tasks/${task.id}`, { body: task });
  }

  /**
   * Deletes task
   * @param taskId Task id to delete
   * @returns Request observable
   */
  public delete(taskId: number): Observable<null> {
    return this.apiService.delete(`/tasks/${taskId}`);
  }
}
