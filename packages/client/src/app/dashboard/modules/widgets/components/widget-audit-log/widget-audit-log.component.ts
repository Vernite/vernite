import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../../tasks/services/task/task.service';
import { map, Observable, switchMap, forkJoin, of, EMPTY } from 'rxjs';
import { MemberService } from '../../../../services/member/member.service';
import { ProjectService } from '../../../../services/project/project.service';
import { StatusService } from '../../../../../tasks/services/status/status.service';
import { Project } from '../../../../interfaces/project.interface';
import { UserService } from '../../../../../auth/services/user/user.service';
import { Loader } from '../../../../../_main/classes/loader/loader.class';
import { withLoader } from '../../../../../_main/operators/loader.operator';
import { AuditLog } from '../../../../../_main/modules/audit-log/interfaces/audit-log.interface';

@Component({
  selector: 'widget-audit-log',
  templateUrl: './widget-audit-log.component.html',
  styleUrls: ['./widget-audit-log.component.scss'],
})
export class WidgetAuditLogComponent implements OnInit {
  public projects$: Observable<
    {
      project: Project;
      auditLog: AuditLog<any>[];
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
      map((projects) => projects.filter((project) => project.auditLog.length > 0)),
    );
  }

  private loadProject(project: Project) {
    return this.userService.getMyself().pipe(
      switchMap(() => {
        return forkJoin({
          project: of(project),
          auditLog: this.projectService.auditLog(project.id),
        });
      }),
    );
  }
}
