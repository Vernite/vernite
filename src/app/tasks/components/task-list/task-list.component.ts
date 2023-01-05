import { Component, Input } from '@angular/core';
import { Status } from '@tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { ProjectMember } from '../../../dashboard/interfaces/project-member.interface';

/**
 * Component to display list of tasks
 */
@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  /** Tasks to display */
  @Input() tasks: Task[] = [];

  /** List of project members */
  @Input() members!: Map<number, ProjectMember>;

  /** Id of the project */
  @Input() projectId!: number;

  /** List of project statuses */
  @Input() statusList: Status[] = [];

  constructor() {}

  /** Track by function for tasks */
  trackByTask(index: number, task: Task) {
    return task.id;
  }
}
