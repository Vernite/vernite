import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GitIssue, GitPull } from '@dashboard/interfaces/git-integration.interface';
import { Project } from '@dashboard/interfaces/project.interface';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { GitIntegrationService } from '@dashboard/services/git-integration.service';
import { WorkspaceService } from '@dashboard/services/workspace.service';
import { Enum } from '@main/classes/enum.class';
import { RouterExtensionsService } from '@main/services/router-extensions.service';
import { TaskPriority } from '@tasks/enums/task-priority.enum';
import { SubTaskType, TaskType } from '@tasks/enums/task-type.enum';
import { Status } from '@tasks/interfaces/status.interface';
import { StatusService } from '@tasks/services/status.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
  subtask?: boolean;
}

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
  public projectList$: Observable<Project[]> = new BehaviorSubject([]);
  public issueList$!: Observable<GitIssue[]>;
  public pullList$!: Observable<GitPull[]>;

  public isGitHubIntegrationAvailable: boolean = false;

  public form = new FormGroup({
    id: new FormControl(null),
    parentTaskId: new FormControl(null),
    type: new FormControl(TaskType.TASK, [requiredValidator()]),
    name: new FormControl('', [requiredValidator()]),
    statusId: new FormControl(null, [requiredValidator()]),
    projectId: new FormControl(null, [requiredValidator()]),
    workspaceId: new FormControl(null, [requiredValidator()]),
    description: new FormControl(''),
    priority: new FormControl(this.taskPriorities[2], [requiredValidator()]),

    // GitHub issue integration fields
    connectWithIssueOnGitHub: new FormControl(false),
    issueAttachGithub: new FormControl(false),
    issue: new FormControl(null),

    // Github pull requests integration fields
    connectWithPullRequestOnGitHub: new FormControl(false),
    pull: new FormControl(null),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private dialogRef: MatDialogRef<TaskDialog>,
    private statusService: StatusService,
    private workspaceService: WorkspaceService,
    private gitIntegrationService: GitIntegrationService,
    private routerExtensions: RouterExtensionsService,
  ) {}

  ngOnInit() {
    this.loadParamsFromUrl();

    const { workspaceId, projectId, task } = this.data;
    this.form.patchValue({ workspaceId, projectId });
    if (task) this.form.patchValue(task);

    this.workspaceList$ = this.workspaceService.list();

    this.form.get('workspaceId')?.valueChanges.subscribe(this.onWorkspaceIdChange.bind(this));
    this.form.get('projectId')?.valueChanges.subscribe(this.onProjectIdChange.bind(this));

    if (workspaceId) {
      this.onWorkspaceIdChange(workspaceId);
    }

    if (projectId) {
      this.onProjectIdChange(projectId);
    }
  }

  onWorkspaceIdChange(workspaceId: number) {
    this.projectList$ = this.projectList$ = this.workspaceService
      .get(workspaceId)
      .pipe(map((workspace) => workspace.projectsWithPrivileges.map((project) => project.project)));
  }

  onProjectIdChange(projectId: number) {
    this.statusList$ = this.statusService.list(projectId);
    this.clearGitHubIntegrationFields();

    this.gitIntegrationService.hasGitHubIntegration(projectId!).subscribe((value) => {
      this.isGitHubIntegrationAvailable = value;

      if (this.isGitHubIntegrationAvailable) {
        this.issueList$ = this.gitIntegrationService.gitHubIssueList(projectId);
        this.pullList$ = this.gitIntegrationService.gitHubPullList(projectId);
      } else {
        this.issueList$ = new BehaviorSubject([]);
        this.pullList$ = new BehaviorSubject([]);
      }
    });
  }

  loadParamsFromUrl() {
    const { workspaceId, projectId } = this.routerExtensions.snapshot.params;
    this.data.workspaceId = this.data.workspaceId || Number(workspaceId);
    this.data.projectId = this.data.projectId || Number(projectId);
  }

  clearGitHubIntegrationFields() {
    this.form.patchValue({
      issueNumberGitHub: null,
      issueAttachGithub: false,
      connectWithIssueOnGitHub: false,
    });
  }

  confirm() {
    const formValues = this.form.value;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (formValues.connectWithIssueOnGitHub && !formValues.issueAttachGithub) {
      formValues.createIssue = true;
    } else {
      formValues.createIssue = false;
    }

    console.log(formValues);

    this.dialogRef.close(formValues);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
