import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '@dashboard/interfaces/project.interface';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { validateForm } from '@main/classes/form.class';
import { timeToInteraction } from '@main/classes/time-to-interaction.class';
import { RouterExtensionsService } from '@main/services/router-extensions/router-extensions.service';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { isNil } from 'lodash-es';
import { Observable } from 'rxjs';
import { requiredValidator } from '../../../_main/validators/required.validator';
import { unixTimestamp } from '../../../_main/interfaces/date.interface';
import { Sprint } from '@tasks/interfaces/sprint.interface';
import { ProjectService } from '@dashboard/services/project/project.service';

export enum SprintDialogVariant {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface SprintDialogData {
  projectId?: number;
  variant: SprintDialogVariant;
  sprint?: Partial<Sprint>;
}

@UntilDestroy()
@Component({
  selector: 'sprint-dialog',
  templateUrl: './sprint.dialog.html',
  styleUrls: ['./sprint.dialog.scss'],
})
export class SprintDialog implements OnInit {
  SprintDialogVariant = SprintDialogVariant;

  public workspaceList$!: Observable<Workspace[]>;
  public projectList$: Observable<Project[]> = this.projectService.list();

  public form = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', [requiredValidator()]),
    projectId: new FormControl<number | null>(null, [requiredValidator()]),
    description: new FormControl<string>(''),
    startDate: new FormControl<unixTimestamp | null>(null, [requiredValidator()]),
    finishDate: new FormControl<unixTimestamp | null>(null, [requiredValidator()]),
    status: new FormControl<string>('CREATED'),
  });

  public interactive$ = timeToInteraction();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SprintDialogData,
    private dialogRef: MatDialogRef<SprintDialog>,
    private routerExtensions: RouterExtensionsService,
    private projectService: ProjectService,
  ) {}

  ngOnInit() {
    this.loadParamsFromUrl();

    const { projectId, sprint } = this.data;
    this.form.patchValue({ projectId });
    if (sprint) {
      this.form.patchValue(sprint);
    }
  }

  loadParamsFromUrl() {
    const { projectId } = this.routerExtensions.snapshot.params;

    if (!isNil(projectId) && !this.data.projectId) this.data.projectId = Number(projectId);
  }

  confirm() {
    if (validateForm(this.form)) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
