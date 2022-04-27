import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/dashboard/interfaces/project.interface';
import { Workspace } from 'src/app/dashboard/interfaces/workspace.interface';

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

  constructor(private router: Router) {}

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
    return true;
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

  editWorkspace() {
    this.router.navigate(['/', this.workspace.id, 'edit']);
  }

  deleteWorkspace() {}
}
