import { FormControl } from '@ngneat/reactive-forms';
import { AbstractControl, NgControl } from '@angular/forms';

/** Test NgControl implementation. */
export class TestNgControl extends NgControl {
  /**
   * @ignore
   * Dummy control to use in tests.
   */
  private _control = new FormControl<any>('');
  viewToModelUpdate(newValue: any): void {
    this._control = newValue;
  }
  get control(): AbstractControl | null {
    return this._control;
  }
}
