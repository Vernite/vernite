import { Injectable } from '@angular/core';
import { DialogOutlet, DialogService } from '../dialog/dialog.service';
import { ManualDialog } from '../../dialogs/manual/manual.dialog';

@Injectable({
  providedIn: 'root',
})
export class ManualService {
  constructor(private dialogService: DialogService) {}

  public open() {
    this.dialogService.open(
      ManualDialog,
      {},
      {
        outlet: DialogOutlet.CONTENT_RIGHT,
        width: '600px',
      },
    );
  }
}
