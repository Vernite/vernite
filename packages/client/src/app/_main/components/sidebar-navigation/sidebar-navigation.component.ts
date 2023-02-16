import { Component, ElementRef, HostBinding, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
import { Workspace } from '@dashboard/interfaces/workspace.interface';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent implements OnInit {
  /** Workspaces list */
  public workspaceList$?: Observable<Workspace[]>;

  /** Slack integrations list */
  public slackIntegrations$?: Observable<any>;

  /** sidebar navigation entries container reference */
  @ViewChild('entries') entries!: ElementRef<HTMLElement>;

  /** is collapsed */
  @HostBinding('class.collapsed') public isCollapsed = false;

  /** Width */
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

  /** @ignore */
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
  }

  /**
   * Toggle sidebar navigation collapsed state
   */
  toggle() {
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  /**
   * Collapse sidebar navigation
   */
  collapse() {
    this.isCollapsed = true;
  }

  /**
   * Expand sidebar navigation
   */
  expand() {
    this.isCollapsed = false;
  }

  /**
   * Route to workspace
   * @param workspace workspace to open
   */
  routeToWorkspace(workspace: Workspace) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'workspaces', workspace.id]));
  }

  /**
   * Route to project
   * @param project project to open
   */
  routeToProject(project: Project) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'projects', project.id]));
  }

  /**
   * Route to create project
   * @param workspace workspace to create project in
   */
  createProject(workspace: Workspace) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'workspaces', workspace.id, 'projects', 'create']));
  }

  /**
   * Route to edit project
   * @param project project to edit
   */
  editProject(project: Project) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'projects', project.id, 'edit']));
  }

  /**
   * Open delete project dialog
   * @param project project to delete
   */
  deleteProject(project: Project) {
    this.dialogService.confirmProjectDelete(project).subscribe(() => {
      this.projectService.delete(project.id).subscribe(() => {
        window.location.reload();
      });
    });
  }

  /**
   * Route to edit workspace
   * @param workspace workspace to edit
   */
  editWorkspace(workspace: Workspace) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'workspaces', workspace.id, 'edit']));
  }

  /**
   * Open delete workspace dialog
   * @param workspace workspace to delete
   */
  deleteWorkspace(workspace: Workspace) {
    this.dialogService.confirmWorkspaceDelete(workspace).subscribe(() => {
      this.workspaceService.delete(workspace.id).subscribe(() => {
        window.location.reload();
      });
    });
  }

  /**
   * Open project with VSCode
   * @param project project to open
   */
  openWithVSCode(project: Project) {
    window.open(`https://github.dev/${project.gitHubIntegration}`, '_blank');
  }

  /**
   * Open project with local VSCode
   * @param project project to open
   */
  openWithLocalVSCode(project: Project) {
    window.open(
      `vscode://vscode.git/clone?url=https://github.com/${project.gitHubIntegration}`,
      '_blank',
    );
  }

  /**
   * Open project with local VSCode Insiders
   * @param project project to open
   */
  openWithLocalVSCodeInsiders(project: Project) {
    window.open(
      `vscode-insiders://vscode.git/clone?url=https://github.com/${project.gitHubIntegration}`,
      '_blank',
    );
  }
}
