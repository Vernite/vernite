import { Component, HostBinding, Injector, Input, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@main/classes/dialog-ref.class';
import { ViewContainerDirective } from '@main/directives/view-container/view-container.directive';
import { DialogOutlet, DialogService } from '@main/services/dialog/dialog.service';
import { take } from 'rxjs';

/**
 * Dialog outlet component. Outlet to specify in what container alert can be displayed
 */
@Component({
  selector: 'app-dialog-outlet',
  templateUrl: './dialog-outlet.component.html',
  styleUrls: ['./dialog-outlet.component.scss'],
})
export class DialogOutletComponent {
  /** Container to inject dialogs */
  @ViewChild(ViewContainerDirective, { static: true }) host!: ViewContainerDirective;

  /**
   * outlet identifier
   */
  @Input() set outlet(outlet: DialogOutlet) {
    this.dialogService.registerOutlet(outlet, this);
  }

  /** Width of the outlet */
  @HostBinding('style.width') width = '0px';

  constructor(private dialogService: DialogService, private injector: Injector) {}

  /**
   * Show dialog in the outlet
   * @param component dialog component
   * @param data dialog data to send to dialog
   * @returns reference to dialog
   */
  renderDialog(component: any, data: any): DialogRef {
    const dialogRef = new DialogRef();
    const injector = this.createInjector(data, dialogRef);

    dialogRef
      .beforeClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.clearComponent();
      });

    this.loadComponent(component, injector);
    return dialogRef;
  }

  /**
   * Load component to view container
   * @param component dialog component
   * @param injector injector to use for dialog
   */
  private loadComponent(component: any, injector: Injector) {
    const viewContainerRef = this.host.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(component, { injector });

    this.show();
  }

  /**
   * Clear the outlet
   */
  private clearComponent() {
    this.hide();
    setTimeout(() => {
      const viewContainerRef = this.host.viewContainerRef;
      viewContainerRef.clear();
    }, 500);
  }

  /**
   * Method to create injector for dialog with specific data and dialog reference
   * @param data dialog data
   * @param dialogRef dialog reference
   * @returns injector to use for dialog
   */
  private createInjector(data: any, dialogRef: DialogRef) {
    return Injector.create({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: dialogRef },
      ],
      parent: this.injector,
    });
  }

  /**
   * Show the outlet
   */
  private show() {
    this.width = '450px';
  }

  /**
   * Hide the outlet
   */
  private hide() {
    this.width = '0px';
  }
}
