import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { Status } from '@tasks/interfaces/status.interface';
import { Observable } from 'rxjs';
import { requiredValidator } from '../../../_main/validators/required.validator';

/**
 * Add member dialog data
 */
export interface AddMemberDialogData {
  /** Workspace id */
  workspaceId: number;
  /** Project id */
  projectId?: number;
}

/**
 * Add member dialog component
 */
@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member.dialog.html',
  styleUrls: ['./add-member.dialog.scss'],
})
export class AddMemberDialog {
  /** Project status list */
  public statusList$!: Observable<Status[]>;

  /** Workspace list */
  public workspaceList$!: Observable<Workspace[]>;

  /** Add member dialog form */
  public form = new FormGroup({
    email: new FormControl('', [requiredValidator()]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddMemberDialogData,
    private dialogRef: MatDialogRef<AddMemberDialog>,
  ) {}

  /** Save dialog */
  addMembers() {
    const formValues = this.form.value;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    this.dialogRef.close([formValues.email]);
  }

  /** Cancel dialog */
  cancel() {
    this.dialogRef.close();
  }
}
