import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import {
  faChevronRight,
  faCodeCommit,
  faCodePullRequest,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { Status } from '@tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { TaskService } from '@tasks/services/task/task.service';
import { Router } from '@angular/router';

/**
 * Component to display task row in tasks list
 */
@Component({
  selector: 'task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
})
export class TaskRowComponent implements AfterViewInit {
  /** Task to display */
  @Input() task!: Task;

  /** Id of the project */
  @Input() projectId!: number;

  /** If we are in subtask view */
  @Input() subtask: boolean = false;

  /** List of project members */
  @Input() members!: Map<number, ProjectMember>;

  /** List of project statuses */
  @Input() statusList: Status[] = [];

  /** Subtasks reference to element in view */
  @ViewChild('subtasks') subtasks?: ElementRef<HTMLElement>;

  /** If subtasks are expanded */
  isExpanded = false;

  /** Max height of subtasks */
  subtasksMaxHeight = 0;

  /** @ignore */
  faChevronRight = faChevronRight;

  /** @ignore */
  faCodeCommit = faCodeCommit;

  /** @ignore */
  faCodePullRequest = faCodePullRequest;

  /** @ignore */
  faCheck = faCheck;

  constructor(private taskService: TaskService, private router: Router) {}

  ngAfterViewInit() {
    this.subtasksMaxHeight = this.subtasks?.nativeElement.scrollHeight || 0;
  }

  /** Expand subtasks */
  expand() {
    this.isExpanded = true;
  }

  /** Collapse subtasks */
  collapse() {
    this.isExpanded = false;
  }

  /** Toggle subtasks */
  toggle() {
    if (this.isExpanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  /** Track by function for subtasks */
  trackByTask(index: number, task: Task) {
    return task.id;
  }

  /** Open edit task dialog */
  editTask(task: Task) {
    this.taskService.openEditTaskDialog(this.projectId, task).subscribe();
  }

  /** Open create subtask dialog */
  createSubtask(task: Task) {
    this.taskService.openCreateSubtaskDialog(this.projectId, task).subscribe();
  }

  /** Open delete task dialog */
  deleteTask(task: Task) {
    this.taskService.deleteWithConfirmation(this.projectId, task).subscribe();
  }

  /** Redirect to task details */
  openDetails(task: Task) {
    this.router.navigate(['projects', this.projectId, 'tasks', task.id]);
  }
}
