import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { Page } from 'src/app/_main/decorators/page.decorator';
import { AlertDialogVariant } from 'src/app/_main/dialogs/alert/alert.dialog';
import { DialogService } from 'src/app/_main/services/dialog.service';
import { Workspace } from '../../interfaces/workspace.interface';
import { WorkspaceService } from '../../services/workspace.service';

@Page()
@Component({
  selector: 'app-workspaces-list-page',
  templateUrl: './workspaces-list.page.html',
  styleUrls: ['./workspaces-list.page.scss'],
})
export class WorkspacesListPage implements OnInit, OnDestroy {
  constructor(
    private workspaceService: WorkspaceService,
    private dialogService: DialogService,
    private router: Router,
  ) {}

  public faPlus = faPlus;

  public workspaces$?: Observable<Workspace[]>;

  public workspaces: Workspace[] = [];
  public workspacesListSubscription?: Subscription;

  ngOnInit() {
    this.loadWorkspaces();
  }

  loadWorkspaces() {
    this.workspaces$ = this.workspaceService.list();
    this.workspacesListSubscription = this.workspaces$.subscribe();
  }

  deleteWorkspace(workspace: Workspace) {
    this.dialogService
      .confirm({
        title: $localize`Delete workspace`,
        message: $localize`Are you sure you want to delete this workspace?`,
        confirmText: $localize`Delete`,
        cancelText: $localize`Cancel`,
        variant: AlertDialogVariant.IMPORTANT,
      })
      .subscribe(() => {
        this.workspaceService.delete(workspace.id).subscribe(() => {
          this.loadWorkspaces();
        });
      });
  }

  editWorkspace(workspace: Workspace) {
    this.router.navigate(['/workspaces', workspace.id, 'edit']);
  }

  ngOnDestroy() {
    this.workspacesListSubscription?.unsubscribe();
  }
}
