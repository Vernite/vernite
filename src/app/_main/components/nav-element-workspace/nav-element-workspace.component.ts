import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { Project } from 'src/app/dashboard/interfaces/project.interface';
import { Workspace } from 'src/app/dashboard/interfaces/workspace.interface';
import { ProjectService } from 'src/app/dashboard/services/project.service';
import { WorkspaceService } from 'src/app/dashboard/services/workspace.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-nav-element-workspace',
  templateUrl: './nav-element-workspace.component.html',
  styleUrls: ['./nav-element-workspace.component.scss'],
})
export class NavElementWorkspaceComponent implements AfterViewInit {
  @Input()
  public routerLink?: string;

  @Input()
  public workspace: Workspace = { id: -1 } as unknown as Workspace;

  faAngleDown = faAngleDown;
  public activeWorkspace: boolean = false;

  public showArrow$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showArrow$.next(Boolean(this.listElement?.nativeElement.children.length));
    });
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
    this.dialogService.confirmProjectDelete(project).subscribe(() => {
      this.projectService.delete(project.id).subscribe(() => {
        window.location.reload();
      });
    });
  }

  editWorkspace() {
    this.router.navigate(['/', this.workspace.id, 'edit']);
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
}
