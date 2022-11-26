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

@Component({
  selector: 'sprint-page',
  templateUrl: './sprint.page.html',
  styleUrls: ['./sprint.page.scss'],
})
export class SprintPage implements OnInit {
  public projectId!: number;
  public project$: Observable<Project> = of();
  public filters = [];
  public filtersControl = new FormControl();
  public view: 'list' | 'board' = 'list';

  public statusList$: Observable<Status[]> = of([]);
  public statusListWithTasks$: Observable<StatusWithTasks[]> = of([]);
  public board$: Observable<[string | Task, StatusWithTasks[]][]> = of([]);
  public activeSprint$: Observable<Sprint | undefined> = of();
  public emptyMap: Map<number, ProjectMember> = new Map();

  public members$?: Observable<Map<number, ProjectMember>> = of(this.emptyMap);

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService,
    private memberService: MemberService,
    private statusService: StatusService,
    private sprintService: SprintService,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(({ view }) => {
      this.view = view;
    });

    this.activatedRoute.params.subscribe(({ projectId }) => {
      this.projectId = Number(projectId);

      this.project$ = this.projectService.get(projectId);
      this.members$ = this.memberService.map(projectId);
      this.statusList$ = this.statusService.list(projectId);
      this.statusListWithTasks$ = this.statusService.listWithTasks(projectId);
      this.board$ = this.statusService.board(projectId);

      this.activeSprint$ = this.sprintService.getActiveSprint(projectId);
    });
  }

  startSprint(sprint: Sprint) {
    sprint = {
      ...sprint,
      status: SprintStatus.ACTIVE,
    };
    this.sprintService.update(this.projectId, sprint).subscribe(() => {
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
