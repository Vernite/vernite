import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { validateForm } from '@main/classes/form.class';
import { requiredValidator } from '@main/validators/required.validator';

/** Report bug dialog component */
@Component({
  selector: 'report-bug-dialog',
  templateUrl: './report-bug.dialog.html',
  styleUrls: ['./report-bug.dialog.scss'],
})
export class ReportBugDialog implements OnInit {
  /** Report bug dialog form */
  public form = new FormGroup({
    title: new FormControl<string | null>('', [requiredValidator()]),
    description: new FormControl<string | null>(''),
  });

  constructor(private dialogRef: MatDialogRef<ReportBugDialog>) {}

  ngOnInit() {}

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
