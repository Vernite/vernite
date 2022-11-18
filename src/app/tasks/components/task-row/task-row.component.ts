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

@Component({
  selector: 'task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
})
export class TaskRowComponent implements AfterViewInit {
  @Input() task!: Task;
  @Input() projectId!: number;
  @Input() subtask: boolean = false;
  @Input() members!: Map<number, ProjectMember>;
  @Input() statusList: Status[] = [];

  @ViewChild('subtasks') subtasks?: ElementRef<HTMLElement>;

  isExpanded = false;
  subtasksMaxHeight = 0;

  /** @ignore */
  faChevronRight = faChevronRight;

  /** @ignore */
  faCodeCommit = faCodeCommit;

  /** @ignore */
  faCodePullRequest = faCodePullRequest;

  /** @ignore */
  faCheck = faCheck;

  constructor(private taskService: TaskService) {}

  ngAfterViewInit() {
    this.subtasksMaxHeight = this.subtasks?.nativeElement.scrollHeight || 0;
  }

  expand() {
    this.isExpanded = true;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    if (this.isExpanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  trackByTask(index: number, task: Task) {
    return task.id;
  }

  editTask(task: Task) {
    this.taskService.openEditTaskDialog(this.projectId, task).subscribe();
  }

  createSubtask(task: Task) {
    this.taskService.openCreateSubtaskDialog(this.projectId, task).subscribe();
  }

  deleteTask(task: Task) {
    this.taskService.deleteWithConfirmation(this.projectId, task).subscribe();
  }
}
