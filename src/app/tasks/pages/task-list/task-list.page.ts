import { Component } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@auth/services/user/user.service';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { Project } from '@dashboard/interfaces/project.interface';
import { MemberService } from '@dashboard/services/member/member.service';
import { ProjectService } from '@dashboard/services/project/project.service';
import {
  faCheck,
  faChevronRight,
  faCodeCommit,
  faCodePullRequest,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Filters } from '@main/classes/filters.class';
import { Filter } from '@main/interfaces/filters.interface';
import { Status } from '@tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { Observable } from 'rxjs';
import { TaskService } from '@tasks/services/task/task.service';
import { StatusService } from '@tasks/services/status/status.service';
import { SprintService } from '@tasks/services/sprint.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage {
  /** @ignore */
  faPlus = faPlus;

  /** @ignore  */
  faChevronRight = faChevronRight;

  /** @ignore */
  faCodeCommit = faCodeCommit;

  /** @ignore */
  faCodePullRequest = faCodePullRequest;

  /** @ignore */
  faCheck = faCheck;

  public projectId!: number;

  public taskList$!: Observable<Task[]>;
  public statusList$!: Observable<Status[]>;
  public project$!: Observable<Project>;
  public members$: Observable<Map<number, ProjectMember>>;

  public emptyMap = new Map();

  public filters: Filter[] = [];
  public filtersControl = new FormControl<Filter[]>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private statusService: StatusService,
    private projectService: ProjectService,
    private memberService: MemberService,
    private userService: UserService,
    private sprintService: SprintService,
  ) {
    const { projectId, sprintId } = this.activatedRoute.snapshot.params;

    this.projectId = projectId;

    if (sprintId) {
      if (sprintId === 'active') {
        this.sprintService.getActiveSprint(this.projectId).subscribe((activeSprint) => {});
      } else if (sprintId) {
      }
    }

    this.project$ = this.projectService.get(projectId);
    this.members$ = this.memberService.map(projectId);
    this.taskList$ = this.taskService.list(projectId);
    this.statusList$ = this.statusService.list(projectId);

    this.userService.getMyself().subscribe((user) => {
      this.filters.push(Filters.ONLY_MY_TASKS(user.id));
    });

    this.filtersControl.valueChanges.subscribe((filters) => {
      this.taskList$ = this.taskService.list(projectId);
    });
  }
}
