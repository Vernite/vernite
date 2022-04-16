import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum AlertDialogVariant {
  DEFAULT = 'default',
  IMPORTANT = 'important',
}

export interface AlertDialogData {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: AlertDialogVariant;
}

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert.dialog.html',
  styleUrls: ['./alert.dialog.scss'],
})
export class AlertDialog implements OnInit {
  public AlertDialogVariant = AlertDialogVariant;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData,
    private dialogRef: MatDialogRef<AlertDialog>,
  ) {
    data.variant ||= AlertDialogVariant.DEFAULT;
  }

  @HostBinding('class.important-dialog') important: boolean =
    this.data.variant === AlertDialogVariant.IMPORTANT;

  ngOnInit() {}

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
