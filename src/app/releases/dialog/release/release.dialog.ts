import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '@dashboard/interfaces/project.interface';
import { validateForm } from '@main/classes/form.class';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Observable } from 'rxjs';
import { requiredValidator } from '../../../_main/validators/required.validator';
import { unixTimestamp } from '../../../_main/interfaces/date.interface';
import { ProjectService } from '@dashboard/services/project/project.service';
import { Release } from '../../interfaces/release.interface';
import { lengthValidator } from '@main/validators/length.validator';
import { notEmptyValidator } from '@main/validators/not-empty.validator';

/** Interface to represent release dialog variant */
export enum ReleaseDialogVariant {
  CREATE = 'create',
  EDIT = 'edit',
}

/** Interface to represent release dialog data */
export interface ReleaseDialogData {
  /** Project ID */
  projectId: number;
  /** Release dialog variant */
  variant: ReleaseDialogVariant;
  /** Release to edit */
  release?: Partial<Release>;
}

/**
 * Release dialog component
 */
@Component({
  selector: 'release-dialog',
  templateUrl: './release.dialog.html',
  styleUrls: ['./release.dialog.scss'],
})
export class ReleaseDialog implements OnInit {
  /** List of projects */
  public projectList$: Observable<Project[]> = this.projectService.list();

  /** @ignore */
  ReleaseDialogVariant = ReleaseDialogVariant;

  /** Release dialog form */
  public form = new FormGroup({
    id: new FormControl<number | null>(null),
    projectId: new FormControl<number | null>(null, [requiredValidator()]),
    name: new FormControl<string>('', [
      requiredValidator(),
      lengthValidator(1, 50),
      notEmptyValidator(),
    ]),
    description: new FormControl<string>('', [notEmptyValidator()]),
    deadline: new FormControl<unixTimestamp | null>(null, [requiredValidator()]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReleaseDialogData,
    private dialogRef: MatDialogRef<ReleaseDialog>,
    private projectService: ProjectService,
  ) {}

  ngOnInit() {
    const { projectId, release } = this.data;
    this.form.patchValue({ projectId });
    if (release) {
      this.form.patchValue(release);
    }
  }

  /** Confirm action */
  confirm() {
    if (validateForm(this.form)) {
      this.dialogRef.close(this.form.value);
    }
  }

  /** Cancel action */
  cancel() {
    this.dialogRef.close(false);
  }
}
