import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectFormGeneralComponent } from '@dashboard/components/project-form-general/project-form-general.component';
import { ProjectFormIntegrationsComponent } from '@dashboard/components/project-form-integrations/project-form-integrations.component';
import { ProjectFormMembersComponent } from '@dashboard/components/project-form-members/project-form-members.component';
import { ProjectFormStatusesComponent } from '@dashboard/components/project-form-statuses/project-form-statuses.component';
import { Project } from '@dashboard/interfaces/project.interface';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { ProjectFormStage } from '@dashboard/models/project-form-stage.enum';
import { WorkspaceService } from '@dashboard/services/workspace/workspace.service';
import { Loader } from '@main/classes/loader/loader.class';
import { setLoaderMessage, startLoader, stopLoader } from '@main/operators/loader.operator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of, switchMap, tap, forkJoin, map, filter } from 'rxjs';
import { validateForm } from '../../../_main/classes/form.class';

/**
 * Create project page component
 */
@UntilDestroy()
@Component({
  templateUrl: './create-project.page.html',
})
export class CreateProjectPage {
  /** Project general form reference */
  @ViewChild(ProjectFormGeneralComponent) projectFormGeneral!: ProjectFormGeneralComponent;

  /** Project members form reference */
  @ViewChild(ProjectFormMembersComponent) projectFormMembers!: ProjectFormMembersComponent;

  /** Project statuses form reference */
  @ViewChild(ProjectFormStatusesComponent) projectFormStatuses!: ProjectFormStatusesComponent;

  /** Project integrations form reference */
  @ViewChild(ProjectFormIntegrationsComponent)
  projectFormIntegrations!: ProjectFormIntegrationsComponent;

  /** Loader */
  public loader = new Loader();

  /** @ignore */
  ProjectFormStage = ProjectFormStage;

  /** Current project edition stage */
  public stage: ProjectFormStage = ProjectFormStage.GENERAL;

  /** Project form stages */
  public stages = [
    ProjectFormStage.GENERAL,
    ProjectFormStage.MEMBERS,
    ProjectFormStage.STATUSES,
    ProjectFormStage.INTEGRATIONS,
  ];

  /** Current project */
  public project?: Project;

  /** Current workspace id */
  workspaceId?: number;

  /** Current workspace */
  workspace$: Observable<Workspace> = of({} as Workspace);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private workspaceService: WorkspaceService,
  ) {
    this.activatedRoute.params.pipe(untilDestroyed(this)).subscribe((params) => {
      this.workspaceId = params['workspaceId'] ? Number(params['workspaceId']) : undefined;

      if (this.workspaceId) {
        this.workspace$ = this.workspaceService.get(this.workspaceId);
      }
    });
  }

  /**
   * Creates a new project by saving the form data, saving dependent stages and then navigating to the project page.
   * Otherwise, displays an error message.
   */
  public submitCreate(): void {
    if (validateForm(this.projectFormGeneral.form) === false) return;

    (
      this.validate().pipe(
        startLoader(this.loader, $localize`Saving project...`),
        switchMap(() => this.projectFormGeneral.save()),
        tap((project) => {
          this.project = project;
          this.projectFormMembers.project = project;
          this.projectFormStatuses.project = project;
          this.projectFormIntegrations.project = project;
        }),
        setLoaderMessage(this.loader, $localize`Saving project members...`),
        switchMap(() => this.projectFormMembers.save()),
        setLoaderMessage(this.loader, $localize`Saving project statuses...`),
        switchMap(() => this.projectFormStatuses.save()),
        setLoaderMessage(this.loader, $localize`Saving integrations...`),
        switchMap(() => this.projectFormIntegrations.save()),
        stopLoader(this.loader),
      ) as Observable<Project>
    ).subscribe((project) => {
      this.router.navigate(['/', 'projects', project.id]).then(() => {
        location.reload();
      });
    });
  }

  /**
   * Sets the current project form stage
   * @param stage Stage
   */
  public setStage(stage: ProjectFormStage) {
    this.stage = stage;
  }

  /**
   * Sets the current project form stage to the next one
   */
  public nextStage() {
    const index = this.stages.findIndex((s) => s === this.stage);
    if (index >= 0 && index < this.stages.length - 1) {
      this.setStage(this.stages[index + 1]);
    }
  }

  /**
   * Sets the current project form stage to the previous one
   */
  public previousStage() {
    const index = this.stages.findIndex((s) => s === this.stage);
    if (index > 0 && index < this.stages.length) {
      this.setStage(this.stages[index - 1]);
    }
  }

  public validate() {
    return forkJoin([
      this.projectFormGeneral.validate(),
      this.projectFormMembers.validate(),
      this.projectFormStatuses.validate(),
      this.projectFormIntegrations.validate(),
    ]).pipe(
      map((results) => results.every((result) => result)),
      filter(Boolean),
    );
  }
}
