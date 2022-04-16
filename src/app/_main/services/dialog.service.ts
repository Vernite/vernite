import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { AlertDialog, AlertDialogData } from '../dialogs/alert/alert.dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog) {}

  open(component: any, data: any) {
    return this.matDialog.open(component, {
      data,
      width: '400px',
    });
  }

  alert(data: AlertDialogData) {
    return this.open(AlertDialog, data)
      .afterClosed()
      .pipe(filter((result) => result));
  }

  confirm(data: AlertDialogData) {
    return this.alert(data);
  }
}
