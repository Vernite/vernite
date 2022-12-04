import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormControl } from '@ngneat/reactive-forms';
import { ProjectService } from '@dashboard/services/project/project.service';
import { MemberService } from '@dashboard/services/member/member.service';
import { Project } from '@dashboard/interfaces/project.interface';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { Status, StatusWithTasks } from '@tasks/interfaces/status.interface';
import { StatusService } from '@tasks/services/status/status.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Release } from '../../interfaces/release.interface';
import { ReleaseService } from '../../services/release.service';

@UntilDestroy()
@Component({
  selector: 'release-page',
  templateUrl: './release.page.html',
  styleUrls: ['./release.page.scss'],
})
export class ReleasePage implements OnInit {
  public projectId!: number;
  public project$: Observable<Project> = of();

  public releaseId!: number;
  public release$: Observable<Release | undefined> = of();

  public filters = [];
  public filtersControl = new FormControl();

  public statusList$: Observable<Status[]> = of([]);
  public statusListWithTasks$: Observable<StatusWithTasks[]> = of([]);

  public emptyMap: Map<number, ProjectMember> = new Map();

  public members$?: Observable<Map<number, ProjectMember>> = of(this.emptyMap);

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private memberService: MemberService,
    private statusService: StatusService,
    private releaseService: ReleaseService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ projectId, releaseId }) => {
      this.projectId = Number(projectId);
      this.releaseId = Number(releaseId);

      this.release$ = this.releaseService.get(projectId, releaseId);
      this.project$ = this.projectService.get(projectId);
      this.members$ = this.memberService.map(projectId);
      this.statusList$ = this.statusService.list(projectId);
      this.statusListWithTasks$ = this.statusService.listWithTasks(projectId);
    });
  }

  publishRelease(release: Release) {
    this.releaseService.publish(this.projectId, release).subscribe(() => {
      location.reload();
    });
  }

  editRelease(release: Release) {
    this.releaseService.openEditReleaseDialog(this.projectId, release).subscribe(() => {
      location.reload();
    });
  }

  deleteRelease(release: Release) {
    this.releaseService.deleteWithConfirmation(this.projectId, release).subscribe(() => {
      location.reload();
    });
  }
}
