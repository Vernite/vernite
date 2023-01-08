import { Component, Input, ViewChild } from '@angular/core';
import { Status } from '@tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { ProjectMember } from '../../../dashboard/interfaces/project-member.interface';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

/**
 * Component to display list of tasks
 */
@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
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

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  public viewPort!: CdkVirtualScrollViewport;

  constructor() {}

  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort['_renderedContentOffset']) {
      return '-0px';
    }
    let offset = this.viewPort['_renderedContentOffset'];
    return `-${offset}px`;
  }

  /** Track by function for tasks */
  trackByTask(index: number, task: Task) {
    return task.id;
  }
}
