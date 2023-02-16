import { AfterViewInit, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { ProjectService } from '@dashboard/services/project/project.service';
import { WorkspaceService } from '@dashboard/services/workspace/workspace.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { Project } from '@dashboard/interfaces/project.interface';

/**
 * Nav element workspace component
 */
@Component({
  selector: 'app-nav-element-workspace',
  templateUrl: './nav-element-workspace.component.html',
  styleUrls: ['./nav-element-workspace.component.scss'],
})
export class NavElementWorkspaceComponent implements AfterViewInit {
  /**
   * Router link
   */
  @Input() routerLink?: string;

  /** @ignore */
  @Input() workspace: Workspace = {} as Workspace;

  /** @ignore */
  @Input() @HostBinding('class.collapsed') collapsed: boolean = false;

  /** @ignore */
  faAngleDown = faAngleDown;

  /** @ignore */
  faPlus = faPlus;

  /** @ignore */
  public activeWorkspace: boolean = false;

  /** @ignore */
  public showArrow$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /** @ignore */
  @ViewChild('elementList') listElement?: ElementRef<HTMLElement>;

  constructor(
    private workspaceService: WorkspaceService,
    private dialogService: DialogService,
    private projectService: ProjectService,
    private router: Router,
  ) {}

  /** @ignore */
  public openWorkspace() {
    this.activeWorkspace = true;
  }

  /** @ignore */
  public closeWorkspace() {
    this.activeWorkspace = false;
  }

  /** @ignore */
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

  /** @ignore */
  routeToWorkspace() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'workspaces', this.workspace.id]));
  }

  /** @ignore */
  routeToProject(project: Project) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'projects', project.id]));
  }

  /** @ignore */
  createProject() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() =>
        this.router.navigate(['/', 'workspaces', this.workspace.id, 'projects', 'create']),
      );
  }

  /** @ignore */
  editProject(project: Project) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'projects', project.id, 'edit']));
  }

  /** @ignore */
  deleteProject(project: Project) {
    this.dialogService.confirmProjectDelete(project).subscribe(() => {
      this.projectService.delete(project.id).subscribe(() => {
        window.location.reload();
      });
    });
  }

  /** @ignore */
  editWorkspace() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'workspaces', this.workspace.id, 'edit']));
  }

  /** @ignore */
  deleteWorkspace() {
    this.dialogService.confirmWorkspaceDelete(this.workspace).subscribe(() => {
      this.workspaceService.delete(this.workspace.id).subscribe(() => {
        window.location.reload();
      });
    });
  }

  /** @ignore */
  openWithVSCode(project: Project) {
    window.open(`https://github.dev/${project.gitHubIntegration}`, '_blank');
  }

  /** @ignore */
  openWithLocalVSCode(project: Project) {
    window.open(
      `vscode://vscode.git/clone?url=https://github.com/${project.gitHubIntegration}`,
      '_blank',
    );
  }

  /** @ignore */
  openWithLocalVSCodeInsiders(project: Project) {
    window.open(
      `vscode-insiders://vscode.git/clone?url=https://github.com/${project.gitHubIntegration}`,
      '_blank',
    );
  }
}
