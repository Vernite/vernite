import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { ProjectService } from '@dashboard/services/project.service';
import { WorkspaceService } from '@dashboard/services/workspace.service';
import { Enum } from '@main/classes/enum.class';
import { TaskPriority } from '@tasks/enums/task-priority.enum';
import { TaskType } from '@tasks/enums/task-type.enum';
import { Status } from '@tasks/interfaces/status.interface';
import { StatusService } from '@tasks/services/status.service';
import { map, Observable } from 'rxjs';
import { requiredValidator } from '../../../_main/validators/required.validator';
import { Task } from '../../interfaces/task.interface';

export enum TaskDialogVariant {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface TaskDialogData {
  workspaceId: number;
  projectId?: number;
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

  public workspaceList$!: Observable<Workspace[]>;
  public workspaceList!: Workspace[];
  public workspaceListLoaded = false;

  public projectList!: Project[];
  public projectListLoaded = false;

  public form = new FormGroup({
    id: new FormControl(-1),
    type: new FormControl(this.taskTypes[0], [requiredValidator()]),
    name: new FormControl('', [requiredValidator()]),
    statusId: new FormControl(null, [requiredValidator()]),
    projectId: new FormControl(null, [requiredValidator()]),
    workspaceId: new FormControl(null, [requiredValidator()]),
    description: new FormControl(''),
    priority: new FormControl(this.taskPriorities[2], [requiredValidator()]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<TaskDialog>,
    private statusService: StatusService,
    private projectService: ProjectService,
    private workspaceService: WorkspaceService,
  ) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;

    this.data.projectId = this.data.projectId || projectId;
    this.data.workspaceId = this.data.workspaceId || workspaceId;
  }

  ngOnInit() {
    const { workspaceId, projectId, task } = this.data;
    this.form.patchValue({
      workspaceId,
      projectId,
    });

    if (task) {
      this.form.patchValue(task);
    }

    this.workspaceList$ = this.workspaceService.list();

    this.workspaceList$.subscribe((val) => {
      this.workspaceListLoaded = true;
      this.workspaceList = val;
    });

    this.form.get('workspaceId')?.valueChanges.subscribe((workspaceId) => {
      this.projectListLoaded = false;
      this.workspaceService
        .get(workspaceId)
        .pipe(
          map(
            (workspace) => workspace.projectsWithPrivileges.map((project) => project.project) || [],
          ),
        )
        .subscribe((projects) => {
          this.projectList = projects;
          this.projectListLoaded = true;
        });
    });

    this.form.get('projectId')?.valueChanges.subscribe((projectId) => {
      this.statusListLoaded = false;
      this.statusList$ = this.statusService.list(projectId!);
      this.statusList$.subscribe((statuses) => {
        this.statusList = statuses;
        this.statusListLoaded = true;
      });
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
