import { Component, HostBinding, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Type of the dialog variant. Used to specify what dialog styling should be used.
 */
export enum AlertDialogVariant {
  DEFAULT = 'default',
  IMPORTANT = 'important',
}

/**
 * Alert dialog data interface. Indicates what data will be passed to the dialog.
 */
export interface AlertDialogData {
  /**
   * Dialog title. Displayed at the top of the dialog.
   */
  title?: string;
  /**
   * Dialog message. Displayed below the title.
   */
  message?: string;
  /**
   * Confirm button text.
   */
  confirmText?: string;
  /**
   * Cancel button text.
   */
  cancelText?: string;
  /**
   * Type of the dialog variant. Used to specify what dialog styling should be used.
   */
  variant?: AlertDialogVariant;
}

/**
 * Alert dialog component. Simple dialog with a title, message, and configurable buttons.
 */
@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert.dialog.html',
  styleUrls: ['./alert.dialog.scss'],
})
export class AlertDialog {
  /**
   * Passthrough to the dialog's variant enumerable.
   */
  public AlertDialogVariant = AlertDialogVariant;

  /**
   * Default constructor. Injects the dialog reference and data.
   * @param data Object to pass as data to the dialog
   * @param dialogRef Reference to dialog instance
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData,
    private dialogRef: MatDialogRef<AlertDialog>,
  ) {
    data.variant ||= AlertDialogVariant.DEFAULT;
  }

  /**
   * Host binding to set if the dialog is important.
   */
  @HostBinding('class.important-dialog') important: boolean =
    this.data.variant === AlertDialogVariant.IMPORTANT;

  /**
   * Closes the dialog. Returns false to indicate that the dialog was closed without confirmation.
   */
  cancel() {
    this.dialogRef.close(false);
  }

  /**
   * Closes the dialog. Returns true to indicate that the dialog was closed with confirmation.
   */
  confirm() {
    this.dialogRef.close(true);
  }
}
