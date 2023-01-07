import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GitIssue, GitPull } from '@dashboard/interfaces/git-integration.interface';
import { GitIntegrationService } from '@dashboard/services/git-integration/git-integration.service';
import { validateForm } from '@main/classes/form.class';
import { timeToInteraction } from '@main/classes/time-to-interaction.class';
import { RouterExtensionsService } from '@main/services/router-extensions/router-extensions.service';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TaskPriority } from '@tasks/enums/task-priority.enum';
import { TaskType } from '@tasks/enums/task-type.enum';
import { Status } from '@tasks/interfaces/status.interface';
import { Observable, EMPTY, tap, pairwise, of } from 'rxjs';
import { requiredValidator } from '../../../_main/validators/required.validator';
import { Task } from '../../interfaces/task.interface';
import { unixTimestamp } from '../../../_main/interfaces/date.interface';
import { StatusService } from '@tasks/services/status/status.service';
import { TaskService } from '@tasks/services/task/task.service';
import { Sprint } from '@tasks/interfaces/sprint.interface';
import { SprintService } from '@tasks/services/sprint.service';
import { ProjectService } from '@dashboard/services/project/project.service';
import { Enum } from '@main/classes/enum/enum.class';
import { Loader } from '../../../_main/classes/loader/loader.class';
import { withLoader } from '@main/operators/loader.operator';
import { SprintStatus } from '@tasks/enums/sprint-status.enum';
import { SprintFilters } from '@dashboard/filters/sprint.filters';
import { Release } from 'src/app/releases/interfaces/release.interface';
import { ReleaseService } from 'src/app/releases/services/release.service';
import { ProjectMember } from '../../../dashboard/interfaces/project-member.interface';
import { MemberService } from '@dashboard/services/member/member.service';

/** Task dialog variant: create or edit */
export enum TaskDialogVariant {
  CREATE = 'create',
  EDIT = 'edit',
}

/** Task dialog data to pass to the component on creation */
export interface TaskDialogData {
  /** Workspace id */
  workspaceId: number;
  /** Project id */
  projectId?: number;
  /** Task dialog variant */
  variant: TaskDialogVariant;
  /** Task to edit */
  task?: Partial<Task>;
  /** Parent task of the edited task */
  parentTask?: Task;
}

/**
 * Task dialog component to create or edit task
 */
@UntilDestroy()
@Component({
  selector: 'app-task-dialog',
  templateUrl: './task.dialog.html',
  styleUrls: ['./task.dialog.scss'],
})
export class TaskDialog implements OnInit {
  /** Task types list observable initialized with possible values from parentTask from data */
  public taskTypes$ = this.taskService.listTaskTypes(this.data.parentTask?.type);

  /** Priorities list */
  public taskPriorities = Enum.values(TaskPriority);

  /** Observable with current task parent */
  public parentTask$ =
    this.data.projectId && this.data.task?.parentTaskId
      ? this.taskService.get(this.data.projectId, this.data.task?.parentTaskId)
      : EMPTY;

  /** Projects list observable */
  public projectList$ = this.projectService.list();

  /** Statuses list observable */
  public statusList$!: Observable<Status[]>;

  /** GitHub issues observable */
  public issueList$!: Observable<GitIssue[]>;

  /** GitHub pull requests observable */
  public pullList$!: Observable<GitPull[]>;

  /** Observable with list of all active sprints */
  public sprintListActive$: Observable<Sprint[]> = of([]);

  /** Observable with list of all created sprints */
  public sprintListCreated$: Observable<Sprint[]> = of([]);

  /** Observable with list of all releases */
  public releaseList$: Observable<Release[]> = of([]);

  /** Observable with list of all project members */
  public members$: Observable<ProjectMember[]> = of([]);

  /** Flag to check if GitHub integration is available for the current project */
  public isGitHubIntegrationAvailable: boolean = false;

  /** Task editing or creation form */
  public form = new FormGroup({
    id: new FormControl<number | null>(null),
    parentTaskId: new FormControl<number | null>(null),
    type: new FormControl<TaskType>(this.taskTypes$.value[0][1], [requiredValidator()]),
    name: new FormControl<string>('', [requiredValidator()]),
    statusId: new FormControl<number | null>(null, [requiredValidator()]),
    projectId: new FormControl<number | null>(null, [requiredValidator()]),
    description: new FormControl<string>(''),
    priority: new FormControl<TaskPriority>(TaskPriority.MEDIUM, [requiredValidator()]),
    deadline: new FormControl<unixTimestamp | null>(null),
    estimatedDate: new FormControl<unixTimestamp | null>(null),
    issue: new FormControl<GitIssue | 'CREATE' | 'DETACH' | null>(null),
    pull: new FormControl<GitPull | 'DETACH' | null>(null),
    storyPoints: new FormControl<number | null>(0),
    sprintId: new FormControl<number | null>(null),
    releaseId: new FormControl<number | null>(null),
    assigneeId: new FormControl<number | null>(null),
  });

  /** Observable to check if page is currently interactive */
  public interactive$ = timeToInteraction();

  /** List of statuses loader */
  public statusListLoader = new Loader();

  /** @ignore */
  TaskType = TaskType;

  /** @ignore */
  TaskDialogVariant = TaskDialogVariant;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private dialogRef: MatDialogRef<TaskDialog>,
    private statusService: StatusService,
    private gitIntegrationService: GitIntegrationService,
    private routerExtensions: RouterExtensionsService,
    private taskService: TaskService,
    private sprintService: SprintService,
    private projectService: ProjectService,
    private releaseService: ReleaseService,
    private memberService: MemberService,
  ) {}

  ngOnInit() {
    const { projectId } = this.routerExtensions.snapshot.params;

    if (projectId) this.data.projectId = Number(projectId);

    this.form.patchValue({
      ...this.data.task,
      projectId: this.data.projectId,
    });

    if (this.data.projectId) this.onProjectIdChange(this.data.projectId);

    this.form
      .get('projectId')
      ?.valueChanges.pipe(pairwise(), untilDestroyed(this))
      .subscribe(([previousProjectId, projectId]) => {
        if (previousProjectId === projectId) return;

        this.onProjectIdChange(projectId);

        this.form.get('statusId').setValue(null);
        this.form.get('sprintId').setValue(null);
        this.form.get('releaseId').setValue(null);
      });

    this.form
      .get('parentTaskId')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((parentTaskId) => {
        if (parentTaskId && this.form.get('projectId').value) {
          this.parentTask$ = this.taskService.get(this.form.get('projectId').value!, parentTaskId);
        } else {
          this.parentTask$ = EMPTY;
        }
      });

    if (this.form.get('parentTaskId').value && this.form.get('projectId').value) {
      this.parentTask$ = this.taskService
        .get(this.form.get('projectId').value!, this.form.get('parentTaskId').value!)
        .pipe(
          tap((parentTask) => {
            this.taskTypes$ = this.taskService.listTaskTypes(parentTask.type);
          }),
        );
      this.parentTask$.subscribe();
    }
  }

  /** Function called on every projectId change */
  onProjectIdChange(projectId: number | null) {
    if (!projectId) return;

    this.statusList$ = this.statusService.list(projectId);
    this.statusList$
      .pipe(untilDestroyed(this), withLoader(this.statusListLoader))
      .subscribe((statuses) => {
        const statusId = statuses.find((status) => status.begin)?.id;

        if (!statusId) return;
        if (!this.form.value.statusId) {
          this.form.patchValue({ statusId });
        }
      });

    this.releaseList$ = this.releaseService.list(projectId);
    this.members$ = this.memberService.list(projectId);

    this.sprintListActive$ = this.sprintService.list(
      projectId,
      SprintFilters.STATUS(SprintStatus.ACTIVE),
    );
    this.sprintListCreated$ = this.sprintService.list(
      projectId,
      SprintFilters.STATUS(SprintStatus.CREATED),
    );

    this.gitIntegrationService.hasGitHubIntegration(projectId).subscribe((value) => {
      this.isGitHubIntegrationAvailable = value;

      if (value) {
        this.issueList$ = this.gitIntegrationService.gitHubIssueList(projectId);
        this.pullList$ = this.gitIntegrationService.gitHubPullList(projectId);
      }
    });
  }

  /** Dialog confirm action */
  confirm() {
    if (validateForm(this.form)) {
      this.dialogRef.close(this.form.value);
    }
  }

  /** Dialog cancel action */
  cancel() {
    this.dialogRef.close(false);
  }
}
