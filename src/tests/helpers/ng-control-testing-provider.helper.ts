import { AbstractControl, FormControl, NgControl } from '@angular/forms';

export class TestNgControl extends NgControl {
  private _control = new FormControl('');
  viewToModelUpdate(newValue: any): void {
    this._control = newValue;
  }
  get control(): AbstractControl | null {
    return this._control;
  }
}
