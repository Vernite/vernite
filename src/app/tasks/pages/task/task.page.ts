import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '@tasks/interfaces/task.interface';
import { TaskService } from '@tasks/services/task/task.service';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'task-page',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage {
  public task$: Observable<Task> = EMPTY;

  constructor(private activatedRoute: ActivatedRoute, private taskService: TaskService) {
    const { projectId, taskId } = this.activatedRoute.snapshot.params;
    this.loadTask(Number(projectId), Number(taskId));

    this.activatedRoute.params.subscribe((params) => {
      const { projectId, taskId } = params;
      this.loadTask(Number(projectId), Number(taskId));
    });
  }

  loadTask(projectId: number, taskId: number) {
    this.task$ = this.taskService.get(projectId, taskId);
  }
}
