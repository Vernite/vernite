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

export enum ReleaseDialogVariant {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface ReleaseDialogData {
  projectId: number;
  variant: ReleaseDialogVariant;
  release?: Partial<Release>;
}

@Component({
  selector: 'release-dialog',
  templateUrl: './release.dialog.html',
  styleUrls: ['./release.dialog.scss'],
})
export class ReleaseDialog implements OnInit {
  public projectList$: Observable<Project[]> = this.projectService.list();

  /** @ignore */
  ReleaseDialogVariant = ReleaseDialogVariant;

  public form = new FormGroup({
    id: new FormControl<number | null>(null),
    projectId: new FormControl<number | null>(null, [requiredValidator()]),
    name: new FormControl<string>('', [requiredValidator()]),
    description: new FormControl<string>(''),
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

  confirm() {
    if (validateForm(this.form)) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
