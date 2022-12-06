import { TaskProtoService } from './../../services/task/task.proto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '@tasks/services/task/task.service';
import { Observable, of } from 'rxjs';
import { FormControl } from '@ngneat/reactive-forms';
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

@UntilDestroy()
@Component({
  selector: 'sprint-page',
  templateUrl: './sprint.page.html',
  styleUrls: ['./sprint.page.scss'],
})
export class SprintPage implements OnInit {
  public projectId!: number;
  public project$: Observable<Project> = of();
  public filters$ = FilterChannel.TASKS;
  public view: 'list' | 'board' = 'list';

  public statusList$: Observable<Status[]> = of([]);
  public statusListWithTasks$: Observable<StatusWithTasks[]> = of([]);
  public board$: Observable<[string | Task, StatusWithTasks[]][]> = of([]);
  public activeSprint$: Observable<Sprint | undefined> = of();
  public emptyMap: Map<number, ProjectMember> = new Map();

  public members$?: Observable<Map<number, ProjectMember>> = of(this.emptyMap);
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

  revertSprint(sprint: Sprint) {
    this.sprintService.revertWithConfirmation(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }

  closeSprint(sprint: Sprint) {
    this.sprintService.closeWithConfirmation(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }

  editSprint(sprint: Sprint) {
    this.sprintService.openEditSprintDialog(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }

  deleteSprint(sprint: Sprint) {
    this.sprintService.deleteWithConfirmation(this.projectId, sprint).subscribe(() => {
      location.reload();
    });
  }
}
