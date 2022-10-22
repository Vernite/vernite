import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, of, switchMap } from 'rxjs';
import { ProjectService } from '../../services/project/project.service';
import { WorkspaceService } from '../../services/workspace/workspace.service';
import { Loader } from '@main/classes/loader/loader.class';
import { setLoaderMessage, startLoader, stopLoader } from '@main/operators/loader.operator';
import { ProjectFormGeneralComponent } from '@dashboard/components/project-form-general/project-form-general.component';
import { ProjectFormMembersComponent } from '@dashboard/components/project-form-members/project-form-members.component';
import { ProjectFormStatusesComponent } from '@dashboard/components/project-form-statuses/project-form-statuses.component';
import { ProjectFormIntegrationsComponent } from '@dashboard/components/project-form-integrations/project-form-integrations.component';
import { ProjectFormStage } from '@dashboard/models/project-form-stage.enum';

@UntilDestroy()
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.page.html',
})
export class EditProjectPage implements OnInit {
  @ViewChild(ProjectFormGeneralComponent) projectFormGeneral!: ProjectFormGeneralComponent;
  @ViewChild(ProjectFormMembersComponent) projectFormMembers!: ProjectFormMembersComponent;
  @ViewChild(ProjectFormStatusesComponent) projectFormStatuses!: ProjectFormStatusesComponent;
  @ViewChild(ProjectFormIntegrationsComponent)
  projectFormIntegrations!: ProjectFormIntegrationsComponent;

  /** @ignore */
  ProjectFormStage = ProjectFormStage;

  public stage: ProjectFormStage = ProjectFormStage.GENERAL;

  public project$!: Observable<Project>;
  public workspace$!: Observable<Workspace>;

  public workspaceId!: number;
  public projectId!: number;

  public loader = new Loader();

  constructor(
    private workspaceService: WorkspaceService,
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;

    this.workspaceId = Number(workspaceId);
    this.projectId = Number(projectId);
  }

  ngOnInit() {
    this.workspace$ = this.workspaceService.get(this.workspaceId);
    this.project$ = this.projectService.get(this.projectId);
  }

  /**
   * Updates a workspace. Passes the form data to the workspace service. Then navigates to the workspace list if form was valid.
   * Otherwise, displays an error message.
   */
  /**
   * Creates a new project by saving the form data, saving dependent stages and then navigating to the project page.
   * Otherwise, displays an error message.
   */
  public submitUpdate(): void {
    (
      of(null).pipe(
        startLoader(this.loader, $localize`Saving project...`),
        switchMap(() => this.projectFormGeneral.save()),
        setLoaderMessage(this.loader, $localize`Saving project members...`),
        switchMap(() => this.projectFormMembers.save()),
        setLoaderMessage(this.loader, $localize`Saving project statuses...`),
        switchMap(() => this.projectFormStatuses.save()),
        setLoaderMessage(this.loader, $localize`Saving integrations...`),
        switchMap(() => this.projectFormIntegrations.save()),
        stopLoader(this.loader),
      ) as Observable<Project>
    ).subscribe((project) => {
      this.router.navigate(['/', this.workspaceId, project.id]);
    });
  }

  public setStage(stage: ProjectFormStage) {
    this.stage = stage;
  }

  public close() {
    this.router.navigate(['/', this.workspaceId, this.projectId]);
  }
}
