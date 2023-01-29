import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../../tasks/services/task/task.service';
import { Observable, forkJoin, EMPTY, map } from 'rxjs';
import { MemberService } from '../../../../services/member/member.service';
import { ProjectMember } from '../../../../interfaces/project-member.interface';
import { Status } from '../../../../../tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { ProjectService } from '../../../../services/project/project.service';
import { StatusService } from '../../../../../tasks/services/status/status.service';
import { Project } from '../../../../interfaces/project.interface';
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
    return forkJoin({
      projects: this.projectService.list(),
      tasks: this.taskService.listTasksAssignedToMe(),
    }).pipe(
      map(({ projects, tasks }) => {
        return projects
          .map((project) =>
            this.loadProject(
              project,
              tasks.filter((task) => task.projectId === project.id),
            ),
          )
          .filter((project) => project.tasks.length > 0);
      }),
    );
  }

  private loadProject(project: Project, tasks: Task[]) {
    return {
      project: project,
      members: new Map(),
      statuses: project.statuses,
      tasks: tasks,
    };
  }
}
