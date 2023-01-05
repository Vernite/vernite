import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { color } from '@main/interfaces/color.interface';
import { requiredValidator } from '@main/validators/required.validator';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Status } from '@tasks/interfaces/status.interface';
import { validateForm } from '@main/classes/form.class';

/**
 * Status dialog data
 */
export interface StatusDialogData {
  /** Status */
  status?: Partial<Status>;
  /** Dialog title */
  title: string;
  /** Confirm button text */
  confirmButtonText: string;
}

/**
 * Status dialog component
 */
@Component({
  selector: 'status-dialog',
  templateUrl: './status.dialog.html',
  styleUrls: ['./status.dialog.scss'],
})
export class StatusDialog implements OnInit {
  /** Status dialog form */
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

  /**
   * Cancel dialog
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Close dialog
   */
  close() {
    if (validateForm(this.form)) {
      this.dialogRef.close({ ...this.data.status, ...this.form.value });
    }
  }
}
