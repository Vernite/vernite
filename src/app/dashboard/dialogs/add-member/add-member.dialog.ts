import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { RouterExtensionsService } from '@main/services/router-extensions/router-extensions.service';
import { Status } from '@tasks/interfaces/status.interface';
import { Observable } from 'rxjs';
import { requiredValidator } from '../../../_main/validators/required.validator';

export interface AddMemberDialogData {
  workspaceId: number;
  projectId?: number;
}

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member.dialog.html',
  styleUrls: ['./add-member.dialog.scss'],
})
export class AddMemberDialog {
  public statusList$!: Observable<Status[]>;
  public workspaceList$!: Observable<Workspace[]>;

  public form = new FormGroup({
    email: new FormControl('', [requiredValidator()]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddMemberDialogData,
    private dialogRef: MatDialogRef<AddMemberDialog>,
    private routerExtensions: RouterExtensionsService,
  ) {}

  addMembers() {
    const formValues = this.form.value;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    this.dialogRef.close([formValues.email]);
  }

  cancel() {
    this.dialogRef.close();
  }
}
