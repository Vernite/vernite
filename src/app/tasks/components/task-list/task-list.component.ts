import { Component, Input, ViewChild, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Status } from '@tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { ProjectMember } from '../../../dashboard/interfaces/project-member.interface';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/**
 * Component to display list of tasks
 */
@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnChanges {
  /** Tasks to display */
  @Input() tasks: Task[] = [];

  /** List of project members */
  @Input() members!: Map<number, ProjectMember>;

  /** Id of the project */
  @Input() projectId!: number;

  /** List of project statuses */
  @Input() statusList: Status[] = [];

  /** @ignore */
  faPlus = faPlus;

  public visibleTasks: Task[] = [];
  public currentLimit: number = 50;

  constructor() {}

  ngOnInit() {
    this.visibleTasks = this.tasks.slice(0, this.currentLimit);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      this.visibleTasks = this.tasks.slice(0, this.currentLimit);
    }
  }

  /** Track by function for tasks */
  trackByTask(index: number, task: Task) {
    return task.id;
  }

  increaseLimit() {
    this.currentLimit += 50;
    this.visibleTasks = this.tasks.slice(0, this.currentLimit);
  }
}
