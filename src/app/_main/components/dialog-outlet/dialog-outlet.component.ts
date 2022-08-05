import { Component, HostBinding, Injector, Input, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@main/classes/dialog-ref.class';
import { ViewContainerDirective } from '@main/directives/view-container.directive';
import { DialogOutlet, DialogService } from '@main/services/dialog.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-dialog-outlet',
  templateUrl: './dialog-outlet.component.html',
  styleUrls: ['./dialog-outlet.component.scss'],
})
export class DialogOutletComponent {
  @ViewChild(ViewContainerDirective, { static: true }) host!: ViewContainerDirective;
  @Input() set outlet(outlet: DialogOutlet) {
    this.dialogService.registerOutlet(outlet, this);
  }
  @HostBinding('style.width') width = '0px';

  constructor(private dialogService: DialogService, private injector: Injector) {}

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

  private loadComponent(component: any, injector: Injector) {
    const viewContainerRef = this.host.viewContainerRef;
    viewContainerRef.clear();

    const _componentRef = viewContainerRef.createComponent(component, { injector });
    this.show();
  }

  private clearComponent() {
    this.hide();
    setTimeout(() => {
      const viewContainerRef = this.host.viewContainerRef;
      viewContainerRef.clear();
    }, 500);
  }

  private createInjector(data: any, dialogRef: DialogRef) {
    return Injector.create({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: dialogRef },
      ],
      parent: this.injector,
    });
  }

  private show() {
    this.width = '450px';
  }

  private hide() {
    this.width = '0px';
  }
}
