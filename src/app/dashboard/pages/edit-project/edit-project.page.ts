import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { maxLengthValidator } from '@main/validators/max-length.validator';
import { Observable, Subscription } from 'rxjs';
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
    name: new FormControl('', [requiredValidator(), maxLengthValidator(50)], []),
    newWorkspaceId: new FormControl(null),
  });

  public project$!: Observable<Project>;
  public workspaceList$: Observable<Workspace[]> = this.workspaceService.list();
  // public workspace: Workspace = this.workspaceService.get(id);

  /**
   * Subscription to the workspace updating.
   */
  public updateSubscription?: Subscription;
  /**
   * Subscription to the workspace getting.
   */
  private getSubscription?: Subscription;

  private workspaceId!: number;
  public projectId!: number;

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

    this.workspaceId = Number(workspaceId);
    this.projectId = Number(projectId);

    this.form.addControl('workspaceId', new FormControl(workspaceId));
    this.form.addControl('id', new FormControl(projectId));

    this.loadProject(projectId);
  }

  /**
   * Loads project data from the project service.
   * @param id project id
   */
  public loadProject(id: number) {
    this.project$ = this.projectService.get(id);
    this.getSubscription = this.project$.subscribe((project) => {
      this.form.patchValue(project);
    });

    this.workspaceList$.subscribe((workspaces) => {
      const workspace = workspaces.find((workspace) => workspace.id === this.workspaceId);
      if (workspace) {
        this.form.patchValue({
          newWorkspaceId: workspace.id,
        });
      }
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

    let newWorkspaceId: number = this.form.get('newWorkspaceId')?.value;

    if (this.workspaceId != newWorkspaceId && newWorkspaceId != null) {
      this.editProjectWithWorkspace(newWorkspaceId);
    } else {
      this.editProject();
    }
  }

  public editProjectWithWorkspace(newWorkspaceId: number) {
    this.updateSubscription = this.projectService
      .changeWorkspace(this.projectId, newWorkspaceId)
      .subscribe(() => {
        this.updateSubscription = this.projectService.update(this.form.value).subscribe(() => {
          this.router.navigate(['/', newWorkspaceId]).then(() => {
            location.reload();
          });
        });
      });
  }

  public editProject() {
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
