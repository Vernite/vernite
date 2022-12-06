import { Component, ElementRef, HostBinding, Input, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workspace } from 'src/app/dashboard/interfaces/workspace.interface';
import { WorkspaceService } from '@dashboard/services/workspace/workspace.service';
import {
  faArrowRightArrowLeft,
  faCalendarDay,
  faHashtag,
  faLayerGroup,
  faMessage,
  faPlus,
  faServer,
} from '@fortawesome/free-solid-svg-icons';
import { Project } from '@dashboard/interfaces/project.interface';
import { ProjectService } from './../../../dashboard/services/project/project.service';
import { DialogService } from '@main/services/dialog/dialog.service';
import { Observable } from 'rxjs';
import { SlackIntegrationService } from '@messages/services/slack-integration.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent implements OnInit {
  @Input() public icon!: String;

  public workspaceList$?: Observable<Workspace[]>;
  public slackIntegrations$?: Observable<any>;

  @ViewChild('entries') entries!: ElementRef<HTMLElement>;

  @HostBinding('class.collapsed')
  public isCollapsed = false;

  @HostBinding('style.width')
  public get width() {
    const entries = this.entries?.nativeElement;
    if (!entries) return this.isCollapsed ? '60px' : '280px';
    return (
      (this.isCollapsed ? (entries.scrollHeight > entries.clientHeight ? 70 : 60) : 280) + 'px'
    );
  }

  /** @ignore */
  faArrowRightArrowLeft = faArrowRightArrowLeft;

  /** @ignore */
  faCalendarDay = faCalendarDay;

  /** @ignore */
  faMessage = faMessage;

  /** @ignore */
  faLayerGroup = faLayerGroup;

  /** @ignore */
  faPlus = faPlus;

  /** @ignore */
  faHashtag = faHashtag;

  /** @ignore */
  faServer = faServer;

  /* @ignore */
  faUser = faUser;

  createWorkspace() {
    this.router.navigate(['/', 'workspaces', 'create']);
  }

  constructor(
    private workspaceService: WorkspaceService,
    private router: Router,
    private projectService: ProjectService,
    private dialogService: DialogService,
    private slackService: SlackIntegrationService,
  ) {}

  ngOnInit() {
    this.workspaceList$ = this.workspaceService.list();
    this.slackIntegrations$ = this.slackService.getSlackIntegrationsWithChannelsAndUsers();

    this.slackIntegrations$.subscribe((data) => {
      console.log(data);
    });
  }

  toggle() {
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  collapse() {
    this.isCollapsed = true;
  }

  expand() {
    this.isCollapsed = false;
  }

  routeToWorkspace(workspace: Workspace) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'workspaces', workspace.id]));
  }

  routeToProject(project: Project) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'projects', project.id]));
  }

  createProject(workspace: Workspace) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'workspaces', workspace.id, 'projects', 'create']));
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

  editWorkspace(workspace: Workspace) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'workspaces', workspace.id, 'edit']));
  }

  deleteWorkspace(workspace: Workspace) {
    this.dialogService.confirmWorkspaceDelete(workspace).subscribe(() => {
      this.workspaceService.delete(workspace.id).subscribe(() => {
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
