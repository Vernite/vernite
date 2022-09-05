import { TestNgControl } from '../../../tests/helpers/ng-control-testing-provider.helper';
import { emailValidator } from '../validators/email.validator';
import { ControlAccessor } from './control-accessor.class';
import { ChangeDetectorRef } from '@angular/core';

function values(obj: any): string[] {
  if (!obj) return [];
  return Object.values(obj);
}

class TestChangeDetectorRef extends ChangeDetectorRef {
  markForCheck(): void {
    throw new Error('Method not implemented.');
  }
  detach(): void {
    throw new Error('Method not implemented.');
  }
  detectChanges(): void {
    throw new Error('Method not implemented.');
  }
  checkNoChanges(): void {
    throw new Error('Method not implemented.');
  }
  reattach(): void {
    throw new Error('Method not implemented.');
  }
}

describe('Control Accessor', () => {
  it('should create an instance', () => {
    const ngControl = new TestNgControl();
    const changeDetectorRef = new TestChangeDetectorRef();
    expect(new ControlAccessor(ngControl, changeDetectorRef)).toBeTruthy();
  });

  it('should return empty value when not set', () => {
    const ngControl = new TestNgControl();
    const changeDetectorRef = new TestChangeDetectorRef();
    const controlAccessor = new ControlAccessor(ngControl, changeDetectorRef);
    expect(controlAccessor.value).toEqual('');
  });

  it('should return empty value when set', () => {
    const ngControl = new TestNgControl();
    const changeDetectorRef = new TestChangeDetectorRef();
    const controlAccessor = new ControlAccessor(ngControl, changeDetectorRef);
    controlAccessor.control.setValue('test');
    expect(controlAccessor.value).toBe('test');
  });

  it('should return null when has no errors', () => {
    const ngControl = new TestNgControl();
    const changeDetectorRef = new TestChangeDetectorRef();
    const controlAccessor = new ControlAccessor(ngControl, changeDetectorRef);
    controlAccessor.control.setValue('test');
    expect(controlAccessor.errors).toBeNull();
  });

  it('should successfully validate with emailValidator', () => {
    const ngControl = new TestNgControl();
    const changeDetectorRef = new TestChangeDetectorRef();
    const controlAccessor = new ControlAccessor(ngControl, changeDetectorRef);
    controlAccessor.control.setValidators(emailValidator());
    controlAccessor.control.setValue('TEST');
    expect(values(controlAccessor.errors)).toContain('email');
  });

  it('Should be possible to set disable state of accessor to false', () => {
    const ngControl = new TestNgControl();
    const changeDetectorRef = new TestChangeDetectorRef();
    const controlAccessor = new ControlAccessor(ngControl, changeDetectorRef);
    controlAccessor.setDisabledState(false);
    expect(controlAccessor.control.disabled).toBe(false);
  });

  it('Should be possible to set disable state of accessor to true', () => {
    const ngControl = new TestNgControl();
    const changeDetectorRef = new TestChangeDetectorRef();
    const controlAccessor = new ControlAccessor(ngControl, changeDetectorRef);
    controlAccessor.setDisabledState(true);
    expect(controlAccessor.control.disabled).toBe(true);
  });

  // TODO: This should be an async test, because the required flag is set in ngAfterControlInit
  // it('should have required flag if has required validator', () => {
  //   const ngControl = new TestNgControl();
  //   ngControl.control?.setValidators([requiredValidator()]);
  //   const changeDetectorRef = new TestChangeDetectorRef();
  //   const controlAccessor = new ControlAccessor(ngControl, changeDetectorRef);
  //   controlAccessor.control.setValue('');
  //   expect(controlAccessor.errors).toBeTruthy();
  //   expect(controlAccessor.required).toBeTrue();
  // });

  it('should not throw error if control is not defined', () => {
    const ngControl = new TestNgControl();
    (ngControl as any)._control = null;
    const changeDetectorRef = new TestChangeDetectorRef();
    const controlAccessor = new ControlAccessor(ngControl, changeDetectorRef);
    expect(() => controlAccessor.control).not.toThrow();
  });
});
