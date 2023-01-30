import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'manual-dialog',
  templateUrl: './manual.dialog.html',
  styleUrls: ['./manual.dialog.scss'],
})
export class ManualDialog {
  /** @ignore */
  faClose = faClose;

  constructor(private dialogRef: MatDialogRef<ManualDialog>) {}

  close() {
    this.dialogRef.close();
  }
}
