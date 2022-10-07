import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Page } from '@main/decorators/page/page.decorator';
import { DialogService } from '@main/services/dialog/dialog.service';
import { Workspace } from '../../interfaces/workspace.interface';
import { ProjectService } from '../../services/project/project.service';
import { WorkspaceService } from '../../services/workspace/workspace.service';

/**
 * Workspaces list page component.
 */
@Page()
@Component({
  selector: 'app-workspaces-list-page',
  templateUrl: './workspaces-list.page.html',
  styleUrls: ['./workspaces-list.page.scss'],
})
export class WorkspacesListPage implements OnInit {
  /**
   * Default constructor with dependency injection.
   * @param workspaceService Workspace service
   * @param dialogService Dialog service
   * @param router Router service
   */
  constructor(
    private workspaceService: WorkspaceService,
    private projectService: ProjectService,
    private dialogService: DialogService,
    private router: Router,
  ) {}

  /**
   * Plus icon to display on the add button
   */
  public faPlus = faPlus;

  /**
   * Workspaces list observable to use in the template.
   */
  public workspaces$?: Observable<Workspace[]>;

  /**
   * Lifecycle hook to load workspaces at the start of the page.
   */
  ngOnInit() {
    this.loadWorkspaces();
  }

  /**
   * Loads the workspaces list from the workspace service.
   */
  loadWorkspaces() {
    this.workspaces$ = this.workspaceService.list();
  }

  /**
   * Shows an alert dialog to confirm the workspace deletion and deletes the workspace if confirmed.
   * @param workspace Workspace to delete
   */
  deleteWorkspace(workspace: Workspace) {
    this.dialogService.confirmWorkspaceDelete(workspace).subscribe(() => {
      this.workspaceService.delete(workspace.id).subscribe(() => {
        // this.loadWorkspaces();
        window.location.reload();
      });
    });
  }

  /**
   * Navigates to the workspace edit page.
   * @param workspace Workspace to edit
   */
  editWorkspace(workspace: Workspace) {
    this.router.navigate(['/', workspace.id, 'edit']);
  }

  openWorkspace(workspace: Workspace) {
    this.router.navigate(['/', workspace.id]);
  }
}
