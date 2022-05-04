import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/dashboard/interfaces/project.interface';
import { Workspace } from 'src/app/dashboard/interfaces/workspace.interface';
import { ProjectService } from 'src/app/dashboard/services/project.service';
import { WorkspaceService } from 'src/app/dashboard/services/workspace.service';
import { AlertDialogVariant } from '../../dialogs/alert/alert.dialog';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-nav-element-workspace',
  templateUrl: './nav-element-workspace.component.html',
  styleUrls: ['./nav-element-workspace.component.scss'],
})
export class NavElementWorkspaceComponent {
  @Input()
  public routerLink?: string;

  @Input()
  public workspace: Workspace = { id: -1 } as unknown as Workspace;

  faAngleDown = faAngleDown;
  public activeWorkspace: boolean = false;

  @ViewChild('elementList')
  listElement?: ElementRef;

  constructor(
    private workspaceService: WorkspaceService,
    private dialogService: DialogService,
    private projectService: ProjectService,
    private router: Router,
  ) {}

  public openWorkspace() {
    this.activeWorkspace = true;
  }
  public closeWorkspace() {
    this.activeWorkspace = false;
  }
  public toggleWorkspace() {
    if (!this.activeWorkspace) {
      this.openWorkspace();
    } else {
      this.closeWorkspace();
    }
  }

  public showArrow(): boolean {
    return Boolean(this.listElement?.nativeElement.children.length);
  }

  routeToWorkspace() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', this.workspace.id]));
  }

  routeToProject(project: Project) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', this.workspace.id, project.id]));
  }

  createProject() {
    this.router.navigate(['/', this.workspace.id, 'create']);
  }

  editProject(project: Project) {
    this.router.navigate(['/', this.workspace.id, project.id, 'edit']);
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

  editWorkspace() {
    this.router.navigate(['/', this.workspace.id, 'edit']);
  }

  deleteWorkspace() {
    this.dialogService
      .confirm({
        title: $localize`Delete workspace "${this.workspace.name}"`,
        message: $localize`Are you sure you want to delete workspace "${this.workspace.name}"?`,
        confirmText: $localize`Delete`,
        cancelText: $localize`Cancel`,
        variant: AlertDialogVariant.IMPORTANT,
      })
      .subscribe(() => {
        this.workspaceService.delete(this.workspace.id).subscribe(() => {
          window.location.reload();
        });
      });
  }
}
