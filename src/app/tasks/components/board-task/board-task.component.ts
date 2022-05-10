import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
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

  constructor(private dialogService: DialogService, private taskService: TaskService) {}

  delete() {
    this.dialogService.confirmTaskDelete(this.task).subscribe(() => {
      this.taskService.delete(this.projectId, this.task.id);
    });
  }

  edit() {
    this.dialogService
      .open(TaskDialog, {
        variant: TaskDialogVariant.EDIT,
        projectId: this.projectId,
        task: { ...this.task, status: this.task.statusId },
      })
      .afterClosed()
      .subscribe((task) => {
        if (!task) return;

        this.taskService.update(this.projectId, task);
      });
  }
}
