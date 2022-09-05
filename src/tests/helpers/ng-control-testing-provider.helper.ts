import { FormControl } from '@ngneat/reactive-forms';
import { AbstractControl, NgControl } from '@angular/forms';

export class TestNgControl extends NgControl {
  private _control = new FormControl<any>('');
  viewToModelUpdate(newValue: any): void {
    this._control = newValue;
  }
  get control(): AbstractControl | null {
    return this._control;
  }
}
