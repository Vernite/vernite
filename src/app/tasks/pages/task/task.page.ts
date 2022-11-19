import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Status } from '@tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { TaskService } from '@tasks/services/task/task.service';
import { EMPTY, Observable, tap } from 'rxjs';
import { StatusService } from './../../services/status/status.service';

@Component({
  selector: 'task-page',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage {
  public task$: Observable<Task> = EMPTY;
  public status$: Observable<Status> = EMPTY;

  /** @ignore */
  faPen = faPen;

  /** @ignore */
  faTrash = faTrash;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private statusService: StatusService,
  ) {
    const { projectId, taskId } = this.activatedRoute.snapshot.params;
    this.loadTask(Number(projectId), Number(taskId));

    this.activatedRoute.params.subscribe((params) => {
      const { projectId, taskId } = params;
      this.loadTask(Number(projectId), Number(taskId));
    });
  }

  loadTask(projectId: number, taskId: number) {
    this.task$ = this.taskService
      .get(projectId, taskId)
      .pipe(tap((task) => (this.status$ = this.statusService.get(projectId, task.statusId!))));
  }
}
