import { Component, Input } from '@angular/core';
import { Status } from '@tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { ProjectMember } from '../../../dashboard/interfaces/project-member.interface';
import { ESet } from '../../../_main/classes/e-set.class';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() members!: Map<number, ProjectMember>;
  @Input() projectId!: number;
  @Input() statusList: Status[] = [];

  expandedSubtasks = new ESet();

  constructor() {}

  trackByTask(index: number, task: Task) {
    return task.id;
  }
}
