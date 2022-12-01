import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Page } from '@main/decorators/page/page.decorator';
import { DialogService } from '@main/services/dialog/dialog.service';
import { ProjectService } from '@dashboard/services/project/project.service';
import { Release } from '../../interfaces/release.interface';
import { ReleaseService } from '../../services/release.service';

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
    private projectService: ProjectService,
    private dialogService: DialogService,
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

  public projectId!: number;

  /**
   * Lifecycle hook to load releases at the start of the page.
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe(({ projectId }) => {
      this.projectId = projectId;
      this.loadReleases(projectId);
    });
  }

  /**
   * Loads the releases list from the releases service.
   */
  loadReleases(projectId: number) {
    this.releases$ = this.releaseService.list(projectId);
  }

  createRelease(projectId: number) {}

  /**
   * Navigates to the releases edit page.
   */
  editRelease(projectId: number, release: Release) {}

  /**
   * Shows an alert dialog to confirm the releases deletion and deletes the releases if confirmed.
   * @param releases Releases to delete
   */
  deleteRelease(projectId: number, release: Release) {
    this.releaseService.deleteWithConfirmation(projectId, release.id).subscribe(() => {
      window.location.reload();
    });
  }

  openRelease(projectId: number, release: Release) {
    this.router.navigate(['/', 'projects', projectId, 'releases', release.id]);
  }
}
