import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Project } from '@dashboard/interfaces/project.interface';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { BehaviorSubject, filter } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Service } from '../decorators/service.decorator';
import { AlertDialog, AlertDialogData, AlertDialogVariant } from '../dialogs/alert/alert.dialog';

/**
 * Service to manage dialogs.
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogsMap = new Map();
  private dialogs$ = new BehaviorSubject<Map<number, MatDialogRef<unknown, any>>>(this.dialogsMap);

  public get isAnyDialogOpen() {
    return this.dialogs$.getValue().size > 0;
  }
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
    const dialog = this.matDialog.open(component, {
      data,
      width: '400px',
    });

    const uid = uuid();
    this.dialogsMap.set(uid, dialog);

    dialog.afterClosed().subscribe(() => {
      this.dialogsMap.delete(uid);
      this.dialogs$.next(this.dialogsMap);
    });

    this.dialogs$.next(this.dialogsMap);

    return dialog;
  }

  closeAll() {
    this.dialogsMap.forEach((dialog) => {
      dialog.close();
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

  openErrorDialog(error: string) {
    const data: AlertDialogData = {
      title: 'Error',
      message: error,
      variant: AlertDialogVariant.IMPORTANT,
      cancelText: $localize`Close`,
    };
    return this.alert(data);
  }

  /**
   * Opens a confirm dialog.
   * @param data Object to pass as data to the dialog
   * @returns Reference to the newly-opened dialog.
   */
  confirm(data: AlertDialogData) {
    return this.alert(data);
  }

  confirmProjectDelete(project: Project) {
    return this.confirm({
      title: $localize`Delete project "${project.name}"`,
      message: $localize`Are you sure you want to delete project "${project.name}"?`,
      confirmText: $localize`Delete`,
      cancelText: $localize`Cancel`,
      variant: AlertDialogVariant.IMPORTANT,
    });
  }

  confirmWorkspaceDelete(workspace: Workspace) {
    return this.confirm({
      title: $localize`Delete workspace "${workspace.name}"`,
      message: $localize`Are you sure you want to delete this workspace "${workspace.name}"?`,
      confirmText: $localize`Delete`,
      cancelText: $localize`Cancel`,
      variant: AlertDialogVariant.IMPORTANT,
    });
  }

  confirmTaskDelete(task: Task) {
    return this.confirm({
      title: $localize`Delete task "${task.name}"`,
      message: $localize`Are you sure you want to delete this task "${task.name}"?`,
      confirmText: $localize`Delete`,
      cancelText: $localize`Cancel`,
      variant: AlertDialogVariant.IMPORTANT,
    });
  }
}
