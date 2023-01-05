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

/**
 * Release page component
 */
@UntilDestroy()
@Component({
  selector: 'release-page',
  templateUrl: './release.page.html',
  styleUrls: ['./release.page.scss'],
})
export class ReleasePage implements OnInit {
  /** Project ID */
  public projectId!: number;

  /** Project object */
  public project$: Observable<Project> = of();

  /** Release ID */
  public releaseId!: number;

  /** Release object */
  public release$: Observable<Release | undefined> = of();

  /** List of filters */
  public filters = [];

  /** Filters form control */
  public filtersControl = new FormControl();

  /** List of statuses */
  public statusList$: Observable<Status[]> = of([]);

  /** List of statuses with tasks */
  public statusListWithTasks$: Observable<StatusWithTasks[]> = of([]);

  /** Empty Map of members as a replacement for empty list of project members during loading */
  public emptyMap: Map<number, ProjectMember> = new Map();

  /** Map of members */
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

  /**
   * Change release status to `published`
   * @param release Release to publish
   */
  publishRelease(release: Release) {
    this.releaseService.publish(this.projectId, release).subscribe(() => {
      location.reload();
    });
  }

  /**
   * Open release edit dialog
   * @param release Release to edit
   */
  editRelease(release: Release) {
    this.releaseService.openEditReleaseDialog(this.projectId, release).subscribe(() => {
      location.reload();
    });
  }

  /**
   * Open release delete dialog
   * @param release Release to delete
   */
  deleteRelease(release: Release) {
    this.releaseService.deleteWithConfirmation(this.projectId, release).subscribe(() => {
      location.reload();
    });
  }
}
