import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@dashboard/services/project/project.service';
import { Project } from '@dashboard/interfaces/project.interface';
import { Observable, EMPTY } from 'rxjs';
import { AuditLog } from '@main/modules/audit-log/interfaces/audit-log.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { ProjectMember } from '../../../dashboard/interfaces/project-member.interface';
import { MemberService } from '../../../dashboard/services/member/member.service';

@Component({
  selector: 'project-about-page',
  templateUrl: './project-about.page.html',
  styleUrls: ['./project-about.page.scss'],
})
export class ProjectAboutPage implements OnInit {
  /** Project observable */
  public project$: Observable<Project> = EMPTY;

  /** Project audit log */
  public auditLog$: Observable<AuditLog<Task>[]> = EMPTY;

  /** Project members */
  public members$: Observable<ProjectMember[]> = EMPTY;

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ projectId }) => {
      this.project$ = this.projectService.get(projectId);
      this.auditLog$ = this.projectService.auditLog(projectId);
      this.members$ = this.memberService.list(projectId);
    });
  }
}
