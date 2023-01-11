import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../../tasks/services/task/task.service';
import { map, Observable, switchMap, forkJoin, of, EMPTY } from 'rxjs';
import { MemberService } from '../../../../services/member/member.service';
import { ProjectMember } from '../../../../interfaces/project-member.interface';
import { Status } from '../../../../../tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { ProjectService } from '../../../../services/project/project.service';
import { StatusService } from '../../../../../tasks/services/status/status.service';
import { Project } from '../../../../interfaces/project.interface';
import { TaskFilters } from '../../../../../tasks/filters/task.filters';
import { UserService } from '../../../../../auth/services/user/user.service';
import { Loader } from '../../../../../_main/classes/loader/loader.class';
import { withLoader } from '../../../../../_main/operators/loader.operator';

@Component({
  selector: 'widget-tasks',
  templateUrl: './widget-tasks.component.html',
  styleUrls: ['./widget-tasks.component.scss'],
})
export class WidgetTasksComponent implements OnInit {
  public projects$: Observable<
    {
      project: Project;
      members: Map<number, ProjectMember>;
      statuses: Status[];
      tasks: Task[];
    }[]
  > = EMPTY;

  public columns: Set<string> = new Set(['title', 'status', 'time-tracking']);

  public loader = new Loader();

  constructor(
    private taskService: TaskService,
    private memberService: MemberService,
    private projectService: ProjectService,
    private statusService: StatusService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.projects$ = this.loadProjects().pipe(withLoader(this.loader));
  }

  private loadProjects() {
    return this.projectService.list().pipe(
      switchMap((projects) => {
        return forkJoin(projects.map((project) => this.loadProject(project)));
      }),
      map((projects) => projects.filter((project) => project.tasks.length > 0)),
    );
  }

  private loadProject(project: Project) {
    return this.userService.getMyself().pipe(
      switchMap((user) => {
        return forkJoin({
          project: of(project),
          members: this.memberService.map(project.id),
          statuses: this.statusService.list(project.id),
          tasks: this.taskService.list(project.id, TaskFilters.ASSIGNEE_ID(user.id)),
        });
      }),
    );
  }
}
