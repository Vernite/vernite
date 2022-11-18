import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '@tasks/services/task/task.service';
import { TaskFilters } from '@tasks/filters/task.filters';
import { Observable, of } from 'rxjs';
import { Task } from '@tasks/interfaces/task.interface';
import { FormControl } from '@ngneat/reactive-forms';
import { ProjectService } from '@dashboard/services/project/project.service';
import { MemberService } from '@dashboard/services/member/member.service';
import { Project } from '@dashboard/interfaces/project.interface';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { Status } from '@tasks/interfaces/status.interface';

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

  public taskList$: Observable<Task[]> = of([]);
  public statusList$: Observable<Status[]> = of([]);
  public emptyMap: Map<number, ProjectMember> = new Map();

  public members$?: Observable<Map<number, ProjectMember>> = of(this.emptyMap);

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService,
    private memberService: MemberService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ projectId, sprintId }) => {
      this.projectId = projectId;

      // this.taskList$ = this.taskService.list(projectId, { filters: [TaskFilters.BACKLOG()] });
      this.taskList$ = this.taskService.sprint(projectId, [TaskFilters.SPRINT_ID(1)]);
      this.project$ = this.projectService.get(projectId);
      this.members$ = this.memberService.map(projectId);
    });
  }
}
