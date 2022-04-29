import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../interfaces/task.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { requiredValidator } from '../../../_main/validators/required.validator';

export enum TaskDialogVariant {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface TaskDialogData {
  variant: TaskDialogVariant;
  task?: Partial<Task>;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.dialog.html',
  styleUrls: ['./task.dialog.scss'],
})
export class TaskDialog implements OnInit {
  TaskDialogVariant = TaskDialogVariant;

  public form = new FormGroup({
    name: new FormControl('', [requiredValidator()]),
    description: new FormControl(''),
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
