import { AbstractControl, FormControl, NgControl } from '@angular/forms';
import { emailValidator } from '../validators/email.validator';
import { ControlAccessor } from './control-accessor.class';

class TestNgControl extends NgControl {
  private _control = new FormControl('');
  viewToModelUpdate(newValue: any): void {
    this._control = newValue;
  }
  get control(): AbstractControl | null {
    return this._control;
  }
}

function values(obj: any): string[] {
  if (!obj) return [];
  return Object.values(obj);
}

describe('Control Accessor', () => {
  it('should create an instance', () => {
    const ngControl = new TestNgControl();
    expect(new ControlAccessor(ngControl)).toBeTruthy();
  });

  it('should return empty value when not set', () => {
    const ngControl = new TestNgControl();
    const controlAccessor = new ControlAccessor(ngControl);
    expect(controlAccessor.value).toBe(null);
  });

  it('should return empty value when set', () => {
    const ngControl = new TestNgControl();
    const controlAccessor = new ControlAccessor(ngControl);
    controlAccessor.writeValue('test');
    expect(controlAccessor.value).toBe('test');
  });

  it('should return null when has no errors', () => {
    const ngControl = new TestNgControl();
    const controlAccessor = new ControlAccessor(ngControl);
    controlAccessor.writeValue('test');
    expect(controlAccessor.errors).toBeNull();
  });

  it('should successfully validate with emailValidator', () => {
    const ngControl = new TestNgControl();
    const controlAccessor = new ControlAccessor(ngControl);
    controlAccessor.control.setValidators(emailValidator());
    controlAccessor.writeValue('TEST');
    expect(values(controlAccessor.errors)).toContain('email');
  });

  it('Should be possible to set disable state of accessor to false', () => {
    const ngControl = new TestNgControl();
    const controlAccessor = new ControlAccessor(ngControl);
    controlAccessor.setDisabledState(false);
    expect(controlAccessor.control.disabled).toBe(false);
  });

  it('Should be possible to set disable state of accessor to true', () => {
    const ngControl = new TestNgControl();
    const controlAccessor = new ControlAccessor(ngControl);
    controlAccessor.setDisabledState(true);
    expect(controlAccessor.control.disabled).toBe(true);
  });
});
