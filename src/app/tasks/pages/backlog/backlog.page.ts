import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '@tasks/services/task/task.service';
import { TaskFilters } from '@tasks/filters/task.filters';
import { Observable, of } from 'rxjs';
import { Task } from '@tasks/interfaces/task.interface';
import { ProjectService } from '@dashboard/services/project/project.service';
import { MemberService } from '@dashboard/services/member/member.service';
import { Project } from '@dashboard/interfaces/project.interface';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { Status } from '@tasks/interfaces/status.interface';
import { StatusService } from '@tasks/services/status/status.service';
import { SprintService } from '@tasks/services/sprint.service';
import { Sprint } from '@tasks/interfaces/sprint.interface';
import { SprintFilters } from '@dashboard/filters/sprint.filters';
import { SprintStatus } from '@tasks/enums/sprint-status.enum';
import { TaskProtoService } from '../../services/task/task.proto.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FilterChannel } from '@main/components/filters/filter-channel.model';

/** Sprint backlog page component - to show list of all tasks not attached to any sprint */
@UntilDestroy()
@Component({
  selector: 'backlog-page',
  templateUrl: './backlog.page.html',
  styleUrls: ['./backlog.page.scss'],
})
export class BacklogPage implements OnInit {
  /** Id of the project user is in */
  public projectId!: number;

  /** Observable of the project user is in */
  public project$: Observable<Project> = of();

  /** Observable of the tasks list */
  public taskList$: Observable<Task[]> = of([]);

  /** Observable of the statuses list */
  public statusList$: Observable<Status[]> = of([]);

  /** Observable of the sprints list (status active) */
  public sprintListActive$: Observable<Sprint[]> = of([]);

  /** Observable of the sprints list (status created) */
  public sprintListCreated$: Observable<Sprint[]> = of([]);

  /** Empty map to use as a fallback */
  public emptyMap: Map<number, ProjectMember> = new Map();

  /** Observable of the members of the project */
  public members$?: Observable<Map<number, ProjectMember>> = of(this.emptyMap);

  /** Observable of the tasks filter channel */
  public filters$ = FilterChannel.TASKS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService,
    private memberService: MemberService,
    private statusService: StatusService,
    private sprintService: SprintService,
    private taskProtoService: TaskProtoService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ projectId }) => {
      this.projectId = Number(projectId);

      this.loadTasks();
      this.project$ = this.projectService.get(projectId);
      this.members$ = this.memberService.map(projectId);
      this.statusList$ = this.statusService.list(projectId);

      this.sprintListActive$ = this.sprintService.list(
        projectId,
        SprintFilters.STATUS(SprintStatus.ACTIVE),
      );
      this.sprintListCreated$ = this.sprintService.list(
        projectId,
        SprintFilters.STATUS(SprintStatus.CREATED),
      );

      this.taskProtoService.TASKS.pipe(untilDestroyed(this)).subscribe((task) => {
        if (task.projectId === this.projectId) {
          this.loadTasks();
          this.sprintListActive$ = this.sprintService.list(
            projectId,
            SprintFilters.STATUS(SprintStatus.ACTIVE),
          );
          this.sprintListCreated$ = this.sprintService.list(
            projectId,
            SprintFilters.STATUS(SprintStatus.CREATED),
          );
        }
      });
    });

    this.filters$.subscribe(() => {
      this.loadTasks();
    });
  }

  /** Load tasks into view */
  loadTasks() {
    this.taskList$ = this.taskService.list(this.projectId, [
      TaskFilters.BACKLOG(),
      ...this.filters$.value,
    ]);
  }

  /** Start selected sprint (try to set status ACTIVE) */
  startSprint(sprint: Sprint) {
    sprint = {
      ...sprint,
      status: SprintStatus.ACTIVE,
    };
    this.sprintService.update(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }

  /** Revert selected sprint (try to set status CREATED) */
  revertSprint(sprint: Sprint) {
    this.sprintService.revertWithConfirmation(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }

  /** Close selected sprint (try to set status CLOSED) */
  closeSprint(sprint: Sprint) {
    this.sprintService.closeWithConfirmation(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }

  /** Open dialog to edit selected sprint */
  editSprint(sprint: Sprint) {
    this.sprintService.openEditSprintDialog(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }

  /** Open dialog to delete sprint */
  deleteSprint(sprint: Sprint) {
    this.sprintService.deleteWithConfirmation(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }
}
