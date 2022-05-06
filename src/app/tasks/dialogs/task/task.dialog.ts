import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../interfaces/task.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { requiredValidator } from '../../../_main/validators/required.validator';
import { TaskType } from '@tasks/enums/task-type.enum';
import { TaskPriority } from '@tasks/enums/task-priority.enum';

export enum TaskDialogVariant {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface TaskDialogData {
  variant: TaskDialogVariant;
  task?: Partial<Task>;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task.dialog.html',
  styleUrls: ['./task.dialog.scss'],
})
export class TaskDialog implements OnInit {
  TaskDialogVariant = TaskDialogVariant;

  public taskTypes = Object.values(TaskType);
  public taskPriorities = Object.values(TaskPriority);

  public form = new FormGroup({
    type: new FormControl(this.taskTypes[0], [requiredValidator()]),
    name: new FormControl('', [requiredValidator()]),
    description: new FormControl(''),
    priority: new FormControl(this.taskPriorities[2], [requiredValidator()]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private dialogRef: MatDialogRef<TaskDialog>,
  ) {}

  ngOnInit() {}

  confirm() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
