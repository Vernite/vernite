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
import { isApiFile } from '@main/classes/is-api-file.class';

@UntilDestroy()
@Component({
  selector: 'project-form-general',
  templateUrl: './project-form-general.component.html',
  styleUrls: ['./project-form-general.component.scss'],
})
export class ProjectFormGeneralComponent implements OnInit {
  @Input() project?: Project;
  @Input() workspace?: Workspace;

  public workspaces$: Observable<Workspace[]> = this.workspaceService.list();
  public workspace$!: Observable<Workspace>;

  public form = new FormGroup({
    workspaceId: new FormControl<number>(0, [requiredValidator()]),
    name: new FormControl<string>('', [
      requiredValidator(),
      notEmptyValidator(),
      maxLengthValidator(50),
    ]),
    description: new FormControl<string>(''),
    logo: new FormControl<File | ApiFile | undefined>(undefined),
  });

  constructor(private workspaceService: WorkspaceService, private projectService: ProjectService) {}

  ngOnInit() {
    this.form.patchValue({ ...this.project, workspaceId: this.workspace?.id });
  }

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

  save() {
    return this.saveForm().pipe(switchMap((project) => this.saveLogo(project)));
  }
}
