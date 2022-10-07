import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { maxLengthValidator } from '@main/validators/max-length.validator';
import { Observable, Subscription } from 'rxjs';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { WorkspaceService } from '../../services/workspace/workspace.service';

/**
 * Edit workspace page component.
 */
@Component({
  selector: 'app-edit-workspace-page',
  templateUrl: './edit-workspace.page.html',
  styleUrls: ['./edit-workspace.page.scss'],
})
export class EditWorkspacePage {
  /**
   * Form group for the workspace editing.
   */
  public form = new FormGroup({
    name: new FormControl('', [requiredValidator(), maxLengthValidator(50)], []),
    id: new FormControl(-1),
  });

  public workspace$!: Observable<Workspace>;

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
    const { workspaceId } = this.activatedRoute.snapshot.params;

    this.loadWorkspace(workspaceId);
  }

  /**
   * Loads workspace data from the workspace service.
   * @param id Workspace id
   */
  public loadWorkspace(id: number) {
    this.workspace$ = this.workspaceService.get(id);
    this.getSubscription = this.workspace$.subscribe((workspace) => {
      this.form.patchValue(workspace);
    });
  }

  /**
   * Updates a workspace. Passes the form data to the workspace service. Then navigates to the workspace list if form was valid.
   * Otherwise, displays an error message.
   */
  public submitUpdate() {
    if (!this.updateSubscription?.closed && this.updateSubscription) return;
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    this.updateSubscription = this.workspaceService.update(this.form.value).subscribe(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    });
  }
}
