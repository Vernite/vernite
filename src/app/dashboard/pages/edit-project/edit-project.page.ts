import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { maxLengthValidator } from '@main/validators/max-length.validator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { ProjectService } from '../../services/project/project.service';
import { WorkspaceService } from '../../services/workspace/workspace.service';
import { IntegrationModulesGridComponent } from '@dashboard/components/integration-modules-grid/integration-modules-grid.component';
import { Loader } from '@main/classes/loader/loader.class';
import { setLoaderMessage, startLoader, stopLoader } from '@main/operators/loader.operator';

@UntilDestroy()
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.page.html',
  styleUrls: ['./edit-project.page.scss'],
})
export class EditProjectPage implements OnDestroy {
  @ViewChild(IntegrationModulesGridComponent)
  integrationModulesGrid!: IntegrationModulesGridComponent;

  /** Form group for project editing. */
  public form = new FormGroup({
    name: new FormControl('', [requiredValidator(), maxLengthValidator(50)]),
    workspaceId: new FormControl<number | null>(null, [requiredValidator()]),
  });

  public project$!: Observable<Project>;
  public workspaceList$: Observable<Workspace[]> = this.workspaceService.list();

  /**
   * Subscription to the workspace updating.
   */
  public updateSubscription?: Subscription;
  /**
   * Subscription to the workspace getting.
   */
  private getSubscription?: Subscription;

  public workspaceId!: number;
  public projectId!: number;

  public loader = new Loader();

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
          workspaceId: workspace.id,
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

    this.updateSubscription = of(null)
      .pipe(
        startLoader(this.loader, $localize`Saving project`),
        switchMap(() => this.projectService.update(this.form.value)),
        setLoaderMessage(this.loader, $localize`Saving integrations`),
        switchMap(() => this.integrationModulesGrid.saveAll()),
        stopLoader(this.loader),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.router.navigate(['/', this.workspaceId, this.projectId]);
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
