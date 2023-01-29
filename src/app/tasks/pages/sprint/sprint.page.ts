import { TaskProtoService } from './../../services/task/task.proto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '@tasks/services/task/task.service';
import { Observable, of } from 'rxjs';
import { ProjectService } from '@dashboard/services/project/project.service';
import { MemberService } from '@dashboard/services/member/member.service';
import { Project } from '@dashboard/interfaces/project.interface';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { Status, StatusWithTasks } from '@tasks/interfaces/status.interface';
import { StatusService } from '@tasks/services/status/status.service';
import { SprintService } from '@tasks/services/sprint.service';
import { Sprint } from '@tasks/interfaces/sprint.interface';
import { SprintStatus } from '@tasks/enums/sprint-status.enum';
import { Task } from '@tasks/interfaces/task.interface';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { FilterChannel } from '@main/components/filters/filter-channel.model';
import { TaskFilters } from '@tasks/filters/task.filters';

/** SCRUM Sprint details page */
@UntilDestroy()
@Component({
  selector: 'sprint-page',
  templateUrl: './sprint.page.html',
  styleUrls: ['./sprint.page.scss'],
})
export class SprintPage implements OnInit {
  /** Associated sprint id */
  public projectId!: number;

  /** Associated project observable */
  public project$: Observable<Project> = of();

  /** Associated filters channel observable */
  public filters$ = FilterChannel.TASKS;

  /** Current sprint view */
  public view: 'list' | 'board' = 'list';

  /** Status list */
  public statusList$: Observable<Status[]> = of([]);

  /** Status list with tasks */
  public statusListWithTasks$: Observable<StatusWithTasks[]> = of([]);

  /** Sprint tasks in board structure */
  public board$: Observable<[string | Task, StatusWithTasks[]][]> = of([]);

  /** Active sprint details */
  public activeSprint$: Observable<Sprint | undefined> = of();

  /** Empty members map */
  public emptyMap: Map<number, ProjectMember> = new Map();

  /** Members map */
  public members$?: Observable<Map<number, ProjectMember>> = of(this.emptyMap);

  /** Sprint tasks list */
  public tasks$: Observable<Task[]> = of([]);

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
    this.activatedRoute.queryParams.subscribe(({ view }) => {
      if (view) this.view = view;
    });

    this.activatedRoute.params.subscribe(({ projectId }) => {
      this.projectId = Number(projectId);

      this.project$ = this.projectService.get(projectId);
      this.members$ = this.memberService.map(projectId);
      this.statusList$ = this.statusService.list(projectId);

      this.loadTasks();
    });

    this.taskProtoService.TASKS.pipe(untilDestroyed(this)).subscribe((task) => {
      if (task.projectId === this.projectId) {
        this.loadTasks();
      }
    });

    this.filters$.pipe(untilDestroyed(this)).subscribe(() => {
      this.loadTasks();
    });
  }

  /**
   * Load tasks
   */
  loadTasks() {
    this.activeSprint$ = this.sprintService.getActiveSprint(this.projectId);
    this.activeSprint$.subscribe((sprint) => {
      if (sprint) {
        this.statusListWithTasks$ = this.statusService.listWithTasks(this.projectId, [
          TaskFilters.SPRINT_ID(sprint.id),
          ...this.filters$.value,
        ]);
        this.board$ = this.statusService.board(this.projectId, [
          TaskFilters.SPRINT_ID(sprint.id),
          ...this.filters$.value,
        ]);
        this.tasks$ = this.taskService.list(this.projectId, [
          TaskFilters.SPRINT_ID(sprint.id),
          ...this.filters$.value,
        ]);
      }
    });
  }

  /**
   * Start sprint
   * @param sprint Sprint to start
   */
  startSprint(sprint: Sprint) {
    this.sprintService
      .update(this.projectId, {
        id: sprint.id,
        status: SprintStatus.ACTIVE,
      })
      .subscribe(() => {
        location.reload();
      });
  }

  /**
   * Revert sprint
   * @param sprint Sprint to revert
   */
  revertSprint(sprint: Sprint) {
    this.sprintService.revertWithConfirmation(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }

  /**
   * Close sprint
   * @param sprint Sprint to close
   */
  closeSprint(sprint: Sprint) {
    this.sprintService.closeWithConfirmation(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }

  /**
   * Open sprint edit dialog
   * @param sprint Sprint to edit
   */
  editSprint(sprint: Sprint) {
    this.sprintService.openEditSprintDialog(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }

  /**
   * Delete sprint
   * @param sprint Sprint to delete
   */
  deleteSprint(sprint: Sprint) {
    this.sprintService.deleteWithConfirmation(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }
}
