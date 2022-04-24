import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { ProjectService } from '../../services/project.service';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.page.html',
  styleUrls: ['./edit-project.page.scss'],
})
export class EditProjectPage implements OnDestroy {
  /**
   * Form group for the workspace editing.
   */
  public form = new FormGroup({
    name: new FormControl('', [requiredValidator()], []),
  });

  /**
   * Subscription to the workspace updating.
   */
  public updateSubscription?: Subscription;
  /**
   * Subscription to the workspace getting.
   */
  private getSubscription?: Subscription;

  private workspaceId!: number;
  private projectId!: number;

  /**
   * Default constructor. Injects the Workspace, Router service and ActivatedRoute service.
   * @param workspaceService Workspace service
   * @param router Router service
   * @param activatedRoute ActivatedRoute service
   */
  constructor(
    private workspaceService: WorkspaceService,
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;

    this.workspaceId = workspaceId;
    this.projectId = projectId;

    this.form.addControl('workspaceId', new FormControl(workspaceId));
    this.form.addControl('id', new FormControl(projectId));

    this.loadProject(projectId);
  }

  /**
   * Loads project data from the project service.
   * @param id project id
   */
  public loadProject(id: number) {
    this.getSubscription = this.projectService.get(id).subscribe((workspace) => {
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

    this.updateSubscription = this.projectService.update(this.form.value).subscribe(() => {
      this.router.navigate(['/', this.workspaceId]);
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
