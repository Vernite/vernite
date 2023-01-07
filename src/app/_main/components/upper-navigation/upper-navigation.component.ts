import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@auth/interfaces/user.interface';
import { AuthService } from '@auth/services/auth/auth.service';
import { UserService } from '@auth/services/user/user.service';
import { WorkspaceService } from '@dashboard/services/workspace/workspace.service';
import { faAngleDown, faCog, faSignOut, faUser, faBug } from '@fortawesome/free-solid-svg-icons';
import { ReportService } from '@main/services/reports/report.service';
import { TaskService } from '@tasks/services/task/task.service';
import { finalize, fromEvent, map, skip, take, Observable } from 'rxjs';

/**
 * Upper navigation component
 */
@Component({
  selector: 'app-upper-navigation',
  templateUrl: './upper-navigation.component.html',
  styleUrls: ['./upper-navigation.component.scss'],
})
export class UpperNavigationComponent implements OnInit {
  /** Open below element reference */
  @ViewChild('openBelow') openBelow!: ElementRef<HTMLElement>;

  /** @ignore */
  faAngleDown = faAngleDown;

  /** @ignore */
  faUser = faUser;

  /** @ignore */
  faCog = faCog;

  /** @ignore */
  faSignOut = faSignOut;

  /** @ignore */
  faBug = faBug;

  /** is open below active */
  public active: boolean = false;

  /** is button disabled */
  private _isButtonDisabled = true;

  /** user observable */
  public myself$?: Observable<User>;

  constructor(
    private taskService: TaskService,
    private workspaceService: WorkspaceService,
    private authService: AuthService,
    private userService: UserService,
    private reportService: ReportService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.workspaceService.list().pipe(
      map((workspaces) => {
        if (workspaces.length === 0) {
          this._isButtonDisabled = false;
        } else if (
          workspaces.filter((workspace) => workspace.projectsWithPrivileges.length).length === 0
        ) {
          this._isButtonDisabled = false;
        } else {
          this._isButtonDisabled = true;
        }
      }),
    );

    this.myself$ = this.userService.getMyself();
  }

  /** Open new task dialog */
  createNewTask() {
    this.taskService.openCreateNewTaskDialog().subscribe(() => {
      location.reload();
    });
  }

  /** Logout */
  logout() {
    this.authService
      .logout()
      .pipe(
        finalize(() => {
          this.router.navigate(['/', 'auth', 'login']);
        }),
      )
      .subscribe();
  }

  /** Is button disabled */
  public isButtonDisabled() {
    return this._isButtonDisabled;
  }

  /**
   * Open profile options
   */
  public openProfile() {
    this.active = true;
    fromEvent(document, 'click')
      .pipe(skip(1), take(1))
      .subscribe(() => {
        this.closeProfile();
      });
  }

  /**
   * Close profile options
   */
  public closeProfile() {
    this.active = false;
  }

  /**
   * Toggle profile options
   */
  public toggleProfile() {
    if (!this.active) {
      this.openProfile();
    } else {
      this.closeProfile();
    }
  }

  /**
   * Open bug report dialog
   */
  public reportBug() {
    this.reportService.openBugReportDialog().subscribe();
  }
}
