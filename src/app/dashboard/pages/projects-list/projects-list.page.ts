import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceService } from '../../services/workspace.service';
import { map, Observable } from 'rxjs';
import { Project } from '../../interfaces/project.interface';
import { Workspace } from '../../interfaces/workspace.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'src/app/_main/services/dialog.service';
import { ProjectService } from '../../services/project.service';
import { AlertDialogVariant } from 'src/app/_main/dialogs/alert/alert.dialog';

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
    private projectService: ProjectService,
    private dialogService: DialogService,
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

  deleteProject(project: Project) {
    this.dialogService
      .confirm({
        title: $localize`Delete project "${project.name}"`,
        message: $localize`Are you sure you want to delete this project "${project.name}"?`,
        confirmText: $localize`Delete`,
        cancelText: $localize`Cancel`,
        variant: AlertDialogVariant.IMPORTANT,
      })
      .subscribe(() => {
        this.projectService.delete(project.id).subscribe(() => {
          window.location.reload();
        });
      });
  }
}
