import { Component, Input } from '@angular/core';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { faCheck, faCodeCommit, faCodePullRequest } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from '@tasks/services/task/task.service';
import { Task } from '../../interfaces/task.interface';

/**
 * Component to display task in board
 */
@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent {
  /** Task to display */
  @Input() public task!: Task;

  /** Id of the project */
  @Input() public projectId!: number;

  /** List of project members */
  @Input() public members: Map<number, ProjectMember> = new Map();

  /** @ignore */
  faCodeCommit = faCodeCommit;

  /** @ignore */
  faCodePullRequest = faCodePullRequest;

  /** @ignore */
  faCheck = faCheck;

  constructor(private taskService: TaskService) {}

  /** Open delete task dialog */
  delete() {
    this.taskService.deleteWithConfirmation(this.projectId, this.task).subscribe(() => {
      location.reload();
    });
  }

  /** Open edit task dialog */
  edit() {
    this.taskService.openEditTaskDialog(this.projectId, this.task).subscribe(() => {
      location.reload();
    });
  }

  /** Open create subtask dialog */
  createSubtask() {
    this.taskService.openCreateSubtaskDialog(this.projectId, this.task).subscribe((task) => {
      if (!task) return;

      location.reload();
    });
  }
}
