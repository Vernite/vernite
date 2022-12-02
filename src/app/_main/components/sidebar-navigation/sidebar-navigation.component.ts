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
import { Observable, forkJoin, switchMap, map, of } from 'rxjs';
import { SlackIntegrationService } from '@messages/services/slack-integration.service';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent implements OnInit {
  @Input() public icon!: String;

  public workspaceList$?: Observable<Workspace[]>;
  public channelList$?: Observable<any>;

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

    const channelsWithUser = (integrationId: number) => {
      return this.slackService.getChannels(integrationId).pipe(
        switchMap((channels) => {
          return forkJoin(
            channels.map((channel) => {
              return (<any>(
                (channel.user
                  ? this.slackService.getUser(integrationId, channel.user)
                  : of(channel.user || null))
              )).pipe(
                map((user) => {
                  return {
                    ...channel,
                    user,
                  };
                }),
              );
            }),
          );
        }),
      );
    };

    this.channelList$ = this.slackService.getSlackIntegrations().pipe(
      switchMap((integrations) => {
        return forkJoin(
          integrations.map((integration) => {
            return channelsWithUser(integration.id).pipe(
              map((channels) => {
                return {
                  integration,
                  channels,
                };
              }),
            );
          }),
        );
      }),
    );
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
