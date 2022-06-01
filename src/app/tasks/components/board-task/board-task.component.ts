import { Component, Input } from '@angular/core';
import { faCodeCommit, faCodePullRequest } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '@main/services/dialog.service';
import { TaskDialog, TaskDialogVariant } from '@tasks/dialogs/task/task.dialog';
import { TaskService } from '@tasks/services/task.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent {
  @Input()
  public task!: Task;

  @Input()
  public projectId!: number;

  faCodeCommit = faCodeCommit;
  faCodePullRequest = faCodePullRequest;

  constructor(private dialogService: DialogService, private taskService: TaskService) {}

  delete() {
    this.taskService.deleteWithConfirmation(this.projectId, this.task).subscribe(() => {
      location.reload();
    });
  }

  edit() {
    this.taskService.openEditTaskDialog(this.projectId, this.task).subscribe(() => {
      location.reload();
    });
  }

  createSubtask() {
    this.dialogService
      .open(TaskDialog, {
        variant: TaskDialogVariant.CREATE,
        projectId: this.projectId,
        subtask: true,
        task: {
          parentTaskId: this.task.id,
        },
      })
      .afterClosed()
      .subscribe((task) => {
        if (!task) return;

        this.taskService.create(this.projectId, task).subscribe(() => {
          location.reload();
        });
      });
  }
}
