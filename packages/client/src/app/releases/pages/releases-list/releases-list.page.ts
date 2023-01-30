import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Page } from '@main/decorators/page/page.decorator';
import { Release } from '../../interfaces/release.interface';
import { ReleaseService } from '../../services/release.service';
import { StatusService } from '@tasks/services/status/status.service';
import { Status } from '@tasks/interfaces/status.interface';

/**
 * Releases list page component.
 */
@Page()
@Component({
  selector: 'app-releases-list-page',
  templateUrl: './releases-list.page.html',
  styleUrls: ['./releases-list.page.scss'],
})
export class ReleasesListPage implements OnInit {
  /**
   * Default constructor with dependency injection.
   * @param releaseService Release service
   * @param dialogService Dialog service
   * @param router Router service
   */
  constructor(
    private releaseService: ReleaseService,
    private statusService: StatusService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  /**
   * Plus icon to display on the add button
   */
  public faPlus = faPlus;

  /**
   * Releases list observable to use in the template.
   */
  public releases$?: Observable<Release[]>;
  public statusList$?: Observable<Status[]>;
  public projectId!: number;

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ projectId }) => {
      this.projectId = Number(projectId);
      this.statusList$ = this.statusService.list(projectId);
      this.loadReleases(projectId);
    });
  }

  /**
   * Loads the releases list from the releases service.
   */
  loadReleases(projectId: number) {
    this.releases$ = this.releaseService.list(projectId);
  }

  /**
   * Open releases create dialog.
   */
  createRelease(projectId: number) {
    this.releaseService.openCreateReleaseDialog(projectId).subscribe(() => {
      window.location.reload();
    });
  }

  /**
   * Open releases edit dialog.
   */
  editRelease(projectId: number, release: Release) {
    this.releaseService.openEditReleaseDialog(projectId, release).subscribe(() => {
      window.location.reload();
    });
  }

  /**
   * Delete release.
   */
  deleteRelease(projectId: number, release: Release) {
    this.releaseService.deleteWithConfirmation(projectId, release).subscribe(() => {
      window.location.reload();
    });
  }

  /**
   * Open specific release.
   */
  openRelease(projectId: number, release: Release) {
    this.router.navigate(['/', 'projects', projectId, 'releases', release.id]);
  }

  publishRelease(projectId: number, release: Release) {
    this.releaseService.publish(this.projectId, release).subscribe(() => {
      location.reload();
    });
  }
}
