import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { WorkspaceService } from '../../services/workspace.service';

/**
 * Edit workspace page component.
 */
@Component({
  selector: 'app-edit-workspace-page',
  templateUrl: './edit-workspace.page.html',
  styleUrls: ['./edit-workspace.page.scss'],
})
export class EditWorkspacePage implements OnDestroy {
  /**
   * Form group for the workspace editing.
   */
  public form = new FormGroup({
    name: new FormControl('', [requiredValidator()], []),
    id: new FormControl(-1),
  });

  /**
   * Subscription to the workspace updating.
   */
  public updateSubscription?: Subscription;
  /**
   * Subscription to the workspace getting.
   */
  private getSubscription?: Subscription;

  /**
   * Default constructor. Injects the Workspace, Router service and ActivatedRoute service.
   * @param workspaceService Workspace service
   * @param router Router service
   * @param activatedRoute ActivatedRoute service
   */
  constructor(
    private workspaceService: WorkspaceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const { id } = this.activatedRoute.snapshot.params;

    this.loadWorkspace(id);
  }

  /**
   * Loads workspace data from the workspace service.
   * @param id Workspace id
   */
  public loadWorkspace(id: number) {
    this.getSubscription = this.workspaceService.get(id).subscribe((workspace) => {
      this.form.patchValue(workspace);
    });
  }

  /**
   * Updates a workspace. Passes the form data to the workspace service. Then navigates to the workspace list if form was valid.
   * Otherwise, displays an error message.
   */
  public submitUpdate() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    this.updateSubscription = this.workspaceService.update(this.form.value).subscribe(() => {
      this.router.navigate(['/workspaces']);
    });
  }

  /**
   * Attach to lifecycle hook to unsubscribe from all subscriptions.
   */
  ngOnDestroy(): void {
    if (this.getSubscription) this.getSubscription.unsubscribe();
    if (this.updateSubscription) this.updateSubscription.unsubscribe();
  }
}
