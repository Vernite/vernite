import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../interfaces/task.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { requiredValidator } from '../../../_main/validators/required.validator';
import { TaskType } from '@tasks/enums/task-type.enum';
import { TaskPriority } from '@tasks/enums/task-priority.enum';
import { Enum } from '@main/classes/enum.class';
import { StatusService } from '@tasks/services/status.service';
import { Status } from '@tasks/interfaces/status.interface';
import { Observable } from 'rxjs';

export enum TaskDialogVariant {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface TaskDialogData {
  projectId: number;
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

  public taskTypes = Enum.entries(TaskType);
  public taskPriorities = Object.values(TaskPriority);

  public statusList$!: Observable<Status[]>;
  public statusList!: Status[];
  public statusListLoaded = false;

  public form = new FormGroup({
    id: new FormControl(-1),
    type: new FormControl(this.taskTypes[0], [requiredValidator()]),
    name: new FormControl('', [requiredValidator()]),
    status: new FormControl(null, [requiredValidator()]),
    description: new FormControl(''),
    priority: new FormControl(this.taskPriorities[2], [requiredValidator()]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private dialogRef: MatDialogRef<TaskDialog>,
    private statusService: StatusService
  ) {}

  ngOnInit() {
    const { projectId, task } = this.data;

    if (task) {
      this.form.patchValue(task);
    }

    this.statusList$ = this.statusService.list(projectId);
    this.statusList$.subscribe((statuses) => {
      this.statusList = statuses;
      this.statusListLoaded = true;
    });
  }

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
