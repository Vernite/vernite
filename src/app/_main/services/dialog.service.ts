import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '@dashboard/interfaces/project.interface';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { filter } from 'rxjs';
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
}
