import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Meeting } from '@calendar/interfaces/meeting.interface';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { unixTimestamp } from '@main/interfaces/date.interface';
import { validateForm } from '@main/classes/form.class';

export enum MeetingDialogVariant {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface MeetingDialogData {
  projectId: number;
  meeting?: Partial<Meeting>;
  variant: MeetingDialogVariant;
}

@Component({
  selector: 'meeting-dialog',
  templateUrl: './meeting.dialog.html',
  styleUrls: ['./meeting.dialog.scss'],
})
export class MeetingDialog {
  /** @ignore */
  MeetingDialogVariant = MeetingDialogVariant;

  public form = new FormGroup({
    id: new FormControl<number | null>(null),
    projectId: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null),
    location: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null),
    startDate: new FormControl<unixTimestamp | null>(null),
    endDate: new FormControl<unixTimestamp | null>(null),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MeetingDialogData,
    private dialogRef: MatDialogRef<MeetingDialog>,
  ) {}

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    if (validateForm(this.form)) {
      this.dialogRef.close(this.form.value);
    }
  }
}
