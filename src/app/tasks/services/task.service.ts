import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../_main/services/api.service';
import { Column } from '../interfaces/column.interface';

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
  public tree(): Observable<Column<Task>[]> {
    return of([
      {
        id: 1,
        name: 'To Do',
        tasks: [
          {
            id: 1,
            name: 'Task 1',
            description: 'Task 1 description',
            status: 'To Do',
          },
          {
            id: 2,
            name: 'Task 2',
            description: 'Task 2 description',
            status: 'To Do',
          },
        ],
      },
      {
        id: 2,
        name: 'In progress',
        tasks: [
          {
            id: 3,
            name: 'Task 3',
            description: 'Task 3 description',
            status: 'In progress',
          },
        ],
      },
      {
        id: 3,
        name: 'Done',
        tasks: [],
      },
    ]);
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
    return this.apiService.patch('/tasks/' + task.id, { body: task });
  }
}
