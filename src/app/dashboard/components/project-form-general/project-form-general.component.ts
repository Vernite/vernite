import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@ngneat/reactive-forms';
import { requiredValidator } from '@main/validators/required.validator';
import { notEmptyValidator } from '@main/validators/not-empty.validator';
import { maxLengthValidator } from '@main/validators/max-length.validator';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, of, switchMap, map } from 'rxjs';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { WorkspaceService } from '@dashboard/services/workspace/workspace.service';
import { Project } from './../../interfaces/project.interface';
import { ProjectService } from '@dashboard/services/project/project.service';
import { omit } from 'lodash-es';
import { ApiFile } from '@main/interfaces/api-file.interface';
import { isApiFile } from '@main/util/is-api-file/is-api-file.util';
import { ProjectForm } from '../../interfaces/project-form.interface';
import { lengthValidator } from '@main/validators/length.validator';

/**
 * Project form general component
 */
@UntilDestroy()
@Component({
  selector: 'project-form-general',
  templateUrl: './project-form-general.component.html',
  styleUrls: ['./project-form-general.component.scss'],
})
export class ProjectFormGeneralComponent implements OnInit, ProjectForm {
  /** Project to edit */
  @Input() project?: Project;

  /** Workspace to edit */
  @Input() workspace?: Workspace;

  /** Workspace list */
  public workspaces$: Observable<Workspace[]> = this.workspaceService.list();

  /** Workspace */
  public workspace$!: Observable<Workspace>;

  /** Project form */
  public form = new FormGroup({
    workspaceId: new FormControl<number>(undefined, [requiredValidator({ full: true })]),
    name: new FormControl<string>('', [
      requiredValidator(),
      notEmptyValidator(),
      lengthValidator(1, 50),
    ]),
    description: new FormControl<string>('', [maxLengthValidator(1000)]),
    logo: new FormControl<File | ApiFile | undefined>(undefined),
  });

  constructor(private workspaceService: WorkspaceService, private projectService: ProjectService) {}

  ngOnInit() {
    this.form.patchValue({ ...this.project, workspaceId: this.workspace?.id });
  }

  /**
   * Save project
   */
  saveForm() {
    if (this.project) {
      return this.projectService.update({
        id: this.project.id,
        ...omit(this.form.value, 'logo'),
      });
    } else {
      return this.projectService.create(this.form.value);
    }
  }

  /**
   * Save logo in project
   * @param project Project to edit
   */
  saveLogo(project: Project) {
    const logo = this.form.value.logo;

    if (logo && !isApiFile(logo)) {
      return this.projectService.saveLogo(project.id, logo).pipe(map(() => project));
    } else if (!logo && this.project && this.project.logo) {
      return this.projectService.deleteLogo(this.project.id).pipe(map(() => project));
    } else {
      return of(project);
    }
  }

  /**
   * Save project form changes
   */
  save() {
    return this.saveForm().pipe(switchMap((project) => this.saveLogo(project)));
  }
}
