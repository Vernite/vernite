import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceService } from '../../services/workspace/workspace.service';
import { map, Observable, EMPTY } from 'rxjs';
import { Project } from '../../interfaces/project.interface';
import { Workspace } from '../../interfaces/workspace.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '@main/services/dialog/dialog.service';
import { ProjectService } from '../../services/project/project.service';
import { Loader } from '../../../_main/classes/loader/loader.class';
import { withLoader } from '../../../_main/operators/loader.operator';

/**
 * Projects list page component
 */
@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.page.html',
  styleUrls: ['./projects-list.page.scss'],
})
export class ProjectsListPage implements OnInit {
  /** Workspace object */
  workspace$: Observable<Workspace> = EMPTY;

  /** List of projects */
  projects$: Observable<Project[]> = EMPTY;

  /** @ignore */
  faPlus = faPlus;

  loader = new Loader();

  workspaceId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private workspaceService: WorkspaceService,
    private projectService: ProjectService,
    private dialogService: DialogService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ workspaceId }) => {
      this.workspaceId = workspaceId;

      this.loader.markAsPending();
      this.workspace$ = this.workspaceService.get(workspaceId);
      this.projects$ = this.workspace$.pipe(
        map((workspace) => workspace.projects),
        withLoader(this.loader),
      );
    });
  }

  /** Navigate to project edit page */
  public editProject(project: Project) {
    this.router.navigate(['/', 'projects', project.id, 'edit']);
  }

  /** Navigate to project page */
  public openProject(project: Project) {
    this.router.navigate(['/', 'projects', project.id]);
  }

  /** Open delete project dialog */
  public deleteProject(project: Project) {
    this.dialogService.confirmProjectDelete(project).subscribe(() => {
      this.projectService.delete(project.id).subscribe(() => {
        window.location.reload();
      });
    });
  }
}
