import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GitIssue, GitPull } from '@dashboard/interfaces/git-integration.interface';
import { Project } from '@dashboard/interfaces/project.interface';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { GitIntegrationService } from '@dashboard/services/git-integration/git-integration.service';
import { WorkspaceService } from '@dashboard/services/workspace/workspace.service';
import { Enum } from '@main/classes/enum.class';
import { validateForm } from '@main/classes/form.class';
import { timeToInteraction } from '@main/classes/time-to-interaction.class';
import { RouterExtensionsService } from '@main/services/router-extensions/router-extensions.service';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TaskPriority } from '@tasks/enums/task-priority.enum';
import { SubTaskType, TaskType } from '@tasks/enums/task-type.enum';
import { Status } from '@tasks/interfaces/status.interface';
import { StatusService } from '@tasks/services/status.service';
import { isNil } from 'lodash-es';
import { distinctUntilChanged, map, Observable, pairwise } from 'rxjs';
import { requiredValidator } from '../../../_main/validators/required.validator';
import { Task } from '../../interfaces/task.interface';
import { unixTimestamp } from '../../../_main/interfaces/date.interface';

export enum TaskDialogVariant {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface TaskDialogData {
  workspaceId: number;
  projectId?: number;
  variant: TaskDialogVariant;
  task?: Partial<Task>;
  subtask?: boolean;
}

@UntilDestroy()
@Component({
  selector: 'app-task-dialog',
  templateUrl: './task.dialog.html',
  styleUrls: ['./task.dialog.scss'],
})
export class TaskDialog implements OnInit {
  TaskDialogVariant = TaskDialogVariant;

  public taskTypes = Enum.entries(TaskType);
  public subTaskTypes = Enum.entries(SubTaskType);
  public taskPriorities = Object.values(TaskPriority);

  public statusList$!: Observable<Status[]>;
  public workspaceList$!: Observable<Workspace[]>;
  public projectList$!: Observable<Project[]>;
  public issueList$!: Observable<GitIssue[]>;
  public pullList$!: Observable<GitPull[]>;

  public isGitHubIntegrationAvailable: boolean = false;

  public form = new FormGroup({
    id: new FormControl<number | null>(null),
    parentTaskId: new FormControl<number | null>(null),
    type: new FormControl<TaskType | SubTaskType>(
      this.data.subtask ? SubTaskType.SUBTASK : TaskType.TASK,
      [requiredValidator()],
    ),
    name: new FormControl<string>('', [requiredValidator()]),
    statusId: new FormControl<number | null>(null, [requiredValidator()]),
    projectId: new FormControl<number | null>(null, [requiredValidator()]),
    workspaceId: new FormControl<number | null>(null, [requiredValidator()]),
    description: new FormControl<string>(''),
    priority: new FormControl<TaskPriority>(TaskPriority.MEDIUM, [requiredValidator()]),
    deadline: new FormControl<unixTimestamp | null>(null),
    estimatedDate: new FormControl<unixTimestamp | null>(null),
    issue: new FormControl<GitIssue | 'CREATE' | 'DETACH' | null>(null),
    pull: new FormControl<GitPull | 'DETACH' | null>(null),
  });

  public interactive$ = timeToInteraction();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private dialogRef: MatDialogRef<TaskDialog>,
    private statusService: StatusService,
    private workspaceService: WorkspaceService,
    private gitIntegrationService: GitIntegrationService,
    private routerExtensions: RouterExtensionsService,
  ) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.loadParamsFromUrl();

    const { workspaceId, projectId, task } = this.data;
    this.form.patchValue({ workspaceId, projectId });
    if (task) {
      this.form.patchValue(task);
    }

    this.workspaceList$ = this.workspaceService.list();

    this.form
      .get('workspaceId')
      .valueChanges.pipe(pairwise(), untilDestroyed(this))
      .subscribe(([oldWorkspaceId, newWorkspaceId]) => {
        if (oldWorkspaceId !== newWorkspaceId) {
          console.log('fromSubscription');
          this.onWorkspaceIdChange.bind(this)(newWorkspaceId);
        }
      });
    this.form
      .get('projectId')
      .valueChanges.pipe(distinctUntilChanged(), untilDestroyed(this))
      .subscribe(this.onProjectIdChange.bind(this));

    if (workspaceId) {
      console.log('fromInit');
      this.onWorkspaceIdChange(workspaceId);
    }

    if (projectId) {
      this.onProjectIdChange(projectId);
    }
  }

  onWorkspaceIdChange(workspaceId: number | null) {
    console.log('onWorkspaceIdChange', workspaceId);
    if (this.interactive$.value) {
      this.form.get('projectId').setValue(null);
    }

    if (!workspaceId) return;

    this.projectList$ = this.workspaceService
      .get(workspaceId)
      .pipe(map((workspace) => workspace.projectsWithPrivileges.map((project) => project.project)));
  }

  onProjectIdChange(projectId: number | null) {
    if (!projectId) return;

    this.statusList$ = this.statusService.list(projectId);

    this.statusList$.pipe(untilDestroyed(this)).subscribe((statuses) => {
      const statusId = statuses.find((status) => status.begin)?.id;

      if (!statusId) return;

      this.form.patchValue({ statusId });
    });

    this.gitIntegrationService.hasGitHubIntegration(projectId!).subscribe((value) => {
      this.isGitHubIntegrationAvailable = value;
    });
  }

  loadParamsFromUrl() {
    const { workspaceId, projectId } = this.routerExtensions.snapshot.params;

    if (!isNil(workspaceId) && !this.data.workspaceId) this.data.workspaceId = Number(workspaceId);
    if (!isNil(projectId) && !this.data.projectId) this.data.projectId = Number(projectId);
  }

  confirm() {
    console.log();
    if (validateForm(this.form)) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
