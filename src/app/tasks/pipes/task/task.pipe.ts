import { PipeTransform, Pipe } from '@angular/core';
import { TaskService } from '@tasks/services/task/task.service';

@Pipe({
  name: 'task',
})
export class TaskPipe implements PipeTransform {
  constructor(private taskService: TaskService) {}

  transform(taskId: number | null, projectId: number | null): any {
    if (taskId === null || projectId === null) return null;

    return this.taskService.get(projectId, taskId);
  }
}
