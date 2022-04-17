import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Service } from '../decorators/service.decorator';
import { AlertDialog, AlertDialogData } from '../dialogs/alert/alert.dialog';

/**
 * Service to manage dialogs.
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  /**
   * Default constructor with `MatDialog` dependency.
   * @param matDialog MatDialog instance
   */
  constructor(private matDialog: MatDialog) {}

  /**
   * Opens a modal dialog containing the given component.
   * @param component Type of the component to load into the dialog.
   * @param data Object to pass as data to the dialog
   * @returns Reference to the newly-opened dialog.
   */
  open(component: any, data: any) {
    return this.matDialog.open(component, {
      data,
      width: '400px',
    });
  }

  /**
   * Opens a alert/information dialog.
   * @param data Object to pass as data to the dialog
   * @returns Reference to the newly-opened dialog.
   */
  alert(data: AlertDialogData) {
    return this.open(AlertDialog, data)
      .afterClosed()
      .pipe(filter((result) => result));
  }

  /**
   * Opens a confirm dialog.
   * @param data Object to pass as data to the dialog
   * @returns Reference to the newly-opened dialog.
   */
  confirm(data: AlertDialogData) {
    return this.alert(data);
  }
}
