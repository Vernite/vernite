import { AfterViewInit, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { Project } from 'src/app/dashboard/interfaces/project.interface';
import { Workspace } from 'src/app/dashboard/interfaces/workspace.interface';
import { ProjectService } from '@dashboard/services/project/project.service';
import { WorkspaceService } from '@dashboard/services/workspace/workspace.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-nav-element-workspace',
  templateUrl: './nav-element-workspace.component.html',
  styleUrls: ['./nav-element-workspace.component.scss'],
})
export class NavElementWorkspaceComponent implements AfterViewInit {
  @Input() routerLink?: string;

  @Input() workspace: Workspace = {} as Workspace;

  @Input() @HostBinding('class.collapsed') collapsed: boolean = false;

  /** @ignore */
  faAngleDown = faAngleDown;

  /** @ignore */
  faPlus = faPlus;

  public activeWorkspace: boolean = false;

  public showArrow$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @ViewChild('elementList') listElement?: ElementRef<HTMLElement>;

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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showArrow$.next(Boolean(this.listElement?.nativeElement?.children?.length));
    });
  }

  routeToWorkspace() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'workspaces', this.workspace.id]));
  }

  routeToProject(project: Project) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'projects', project.id]));
  }

  createProject() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'workspaces', this.workspace.id, 'create']));
  }

  editProject(project: Project) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'projects', project.id, 'edit']));
  }

  deleteProject(project: Project) {
    this.dialogService.confirmProjectDelete(project).subscribe(() => {
      this.projectService.delete(project.id).subscribe(() => {
        window.location.reload();
      });
    });
  }

  editWorkspace() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'workspaces', this.workspace.id, 'edit']));
  }

  deleteWorkspace() {
    this.dialogService.confirmWorkspaceDelete(this.workspace).subscribe(() => {
      this.workspaceService.delete(this.workspace.id).subscribe(() => {
        window.location.reload();
      });
    });
  }

  openWithVSCode(project: Project) {
    window.open(`https://github.dev/${project.gitHubIntegration}`, '_blank');
  }

  openWithLocalVSCode(project: Project) {
    window.open(
      `vscode://vscode.git/clone?url=https://github.com/${project.gitHubIntegration}`,
      '_blank',
    );
  }

  openWithLocalVSCodeInsiders(project: Project) {
    window.open(
      `vscode-insiders://vscode.git/clone?url=https://github.com/${project.gitHubIntegration}`,
      '_blank',
    );
  }
}
