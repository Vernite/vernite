import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { color } from '@main/interfaces/color.interface';
import { requiredValidator } from '@main/validators/required.validator';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Status } from '@tasks/interfaces/status.interface';
import { validateForm } from '@main/classes/form.class';

export interface StatusDialogData {
  status?: Partial<Status>;
  title: string;
  confirmButtonText: string;
}

@Component({
  selector: 'status-dialog',
  templateUrl: './status.dialog.html',
  styleUrls: ['./status.dialog.scss'],
})
export class StatusDialog implements OnInit {
  public form = new FormGroup({
    name: new FormControl('', [requiredValidator()]),
    begin: new FormControl(false),
    final: new FormControl(false),
    color: new FormControl<color>(0, [requiredValidator()]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StatusDialogData,
    private dialogRef: MatDialogRef<StatusDialogData>,
  ) {}

  ngOnInit() {
    const { status } = this.data;

    if (status) {
      this.form.patchValue(status as any);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  close() {
    if (validateForm(this.form)) {
      console.log({ ...this.data.status });
      this.dialogRef.close({ ...this.data.status, ...this.form.value });
    }
  }
}
