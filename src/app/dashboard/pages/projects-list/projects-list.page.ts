import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceService } from '../../services/workspace.service';
import { map, Observable } from 'rxjs';
import { Project } from '../../interfaces/project.interface';
import { Workspace } from '../../interfaces/workspace.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.page.html',
  styleUrls: ['./projects-list.page.scss'],
})
export class ProjectsListPage {
  workspace$: Observable<Workspace>;
  projects$: Observable<Project[]>;

  faPlus = faPlus;

  private workspaceId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private workspaceService: WorkspaceService,
    private router: Router,
  ) {
    const { workspaceId } = this.activatedRoute.snapshot.params;

    this.workspaceId = workspaceId;

    this.workspace$ = this.workspaceService.get(workspaceId);
    this.projects$ = this.workspace$.pipe(
      map((workspace) => workspace.projectsWithPrivileges.map((project) => project.project)),
    );
  }

  public editProject(project: Project) {
    this.router.navigate(['/', this.workspaceId, project.id, 'edit']);
  }

  public openProject(project: Project) {
    this.router.navigate(['/', this.workspaceId, project.id]);
  }

  public deleteProject(project: Project) {}
}
