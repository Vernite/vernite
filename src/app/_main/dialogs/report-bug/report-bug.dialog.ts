import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { validateForm } from '@main/classes/form.class';
import { requiredValidator } from '@main/validators/required.validator';
import { lengthValidator } from '@main/validators/length.validator';

/** Report bug dialog component */
@Component({
  selector: 'report-bug-dialog',
  templateUrl: './report-bug.dialog.html',
  styleUrls: ['./report-bug.dialog.scss'],
})
export class ReportBugDialog {
  /** Report bug dialog form */
  public form = new FormGroup({
    title: new FormControl<string | null>('', [requiredValidator(), lengthValidator(3, 100)]),
    description: new FormControl<string | null>('', [
      requiredValidator(),
      lengthValidator(3, 1000),
    ]),
  });

  constructor(private dialogRef: MatDialogRef<ReportBugDialog>) {}

  /** Close dialog */
  cancel() {
    this.dialogRef.close();
  }

  /** Confirm and send dialog */
  send() {
    if (validateForm(this.form)) {
      this.dialogRef.close(this.form.value);
    }
  }
}
