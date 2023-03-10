import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, switchMap, forkJoin, map, filter } from 'rxjs';
import { ProjectService } from '../../services/project/project.service';
import { WorkspaceService } from '../../services/workspace/workspace.service';
import { Loader } from '@main/classes/loader/loader.class';
import { setLoaderMessage, startLoader, stopLoader } from '@main/operators/loader.operator';
import { ProjectFormGeneralComponent } from '@dashboard/components/project-form-general/project-form-general.component';
import { ProjectFormMembersComponent } from '@dashboard/components/project-form-members/project-form-members.component';
import { ProjectFormStatusesComponent } from '@dashboard/components/project-form-statuses/project-form-statuses.component';
import { ProjectFormIntegrationsComponent } from '@dashboard/components/project-form-integrations/project-form-integrations.component';
import { ProjectFormStage } from '@dashboard/models/project-form-stage.enum';

/**
 * Edit project page component
 */
@UntilDestroy()
@Component({
  selector: 'edit-project-page',
  templateUrl: './edit-project.page.html',
})
export class EditProjectPage implements OnInit {
  /** Project general form reference */
  @ViewChild(ProjectFormGeneralComponent) projectFormGeneral!: ProjectFormGeneralComponent;

  /** Project members form reference */
  @ViewChild(ProjectFormMembersComponent) projectFormMembers!: ProjectFormMembersComponent;

  /** Project statuses form reference */
  @ViewChild(ProjectFormStatusesComponent) projectFormStatuses!: ProjectFormStatusesComponent;

  /** Project integrations form reference */
  @ViewChild(ProjectFormIntegrationsComponent)
  projectFormIntegrations!: ProjectFormIntegrationsComponent;

  /** @ignore */
  ProjectFormStage = ProjectFormStage;

  /** Current project edition stage */
  public stage: ProjectFormStage = ProjectFormStage.GENERAL;

  /** Current project */
  public project$!: Observable<Project>;

  /** Current workspace */
  public workspace$!: Observable<Workspace>;

  /** Current workspace id */
  public workspaceId!: number;

  /** Current project id */
  public projectId!: number;

  /** Loader */
  public loader = new Loader();

  constructor(
    private workspaceService: WorkspaceService,
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const { projectId } = this.activatedRoute.snapshot.params;

    this.projectId = Number(projectId);
  }

  ngOnInit() {
    this.workspace$ = this.workspaceService.getWorkspaceByProjectId(this.projectId);
    this.project$ = this.projectService.get(this.projectId);
  }

  /**
   * Edits project by saving the form data, saving dependent stages and then navigating to the project page.
   * Otherwise, displays an error message.
   */
  public submitUpdate(): void {
    (
      this.validate().pipe(
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
      this.router.navigate(['/', 'projects', project.id]);
    });
  }

  /**
   * Sets the current project form stage
   * @param stage project form stage
   */
  public setStage(stage: ProjectFormStage) {
    this.stage = stage;
  }

  /**
   * Goes back to project page
   */
  public close() {
    this.router.navigate(['/', 'projects', this.projectId]);
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
