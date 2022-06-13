import { Component, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ValidationErrors } from '@angular/forms';
import { TestNgControl } from '@tests/helpers/ng-control-testing-provider.helper';
import { Subject } from 'rxjs';

/**
 * A base class for creating custom control accessors like inputs, checkboxes, etc.
 */
@Component({
  template: '',
  providers: [{ provide: NgControl, useClass: TestNgControl }],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ControlAccessor implements OnDestroy, ControlValueAccessor {
  /**
   * Property that defines if field should prompt user how to fill it. For example
   * in a form, if a field is email, it will give the user last used emails
   */
  @Input() autocomplete: 'on' | 'off' = 'off';

  /**
   * Property to describe if the control is required.
   * @returns true if the control is required to fill in form.
   */
  public get required() {
    return this._required;
  }

  public get name() {
    return this.ngControl.name?.toString() || '';
  }

  /**
   * Private property to set filed as required
   */
  private _required: boolean = false;

  /**
   * Control that is used by the form.
   */
  public get control(): FormControl {
    return (this.ngControl.control as FormControl) || new FormControl();
  }

  /**
   * Observable that emits when the control is destroyed.
   */
  private destroy$ = new Subject();

  /**
   * Observable that emits when the control is touched.
   */
  private touched$ = new Subject();

  /**
   * Get the value of the control.
   */
  public get value(): any {
    return this.control.value;
  }

  /**
   * Get the errors of the control.
   */
  public get errors(): ValidationErrors | null {
    return this.control.errors;
  }

  /**
   * Accessor constructor to initialize component. Extended by child classes.
   * @param ngControl control to be used by the accessor
   */
  constructor(
    /**
     * Control passed from DOM to the component, contains all the information about form control
     */
    public ngControl: NgControl,
  ) {
    this.ngControl.valueAccessor = this;

    this.initCheckForTouch();
    this.checkIfIsRequired();
  }

  /**
   * Check if the control is required by provided validators.
   */
  private checkIfIsRequired(): void {
    if (!(this.control as any)._rawValidators) return;

    for (const validator of (this.ngControl as any).control._rawValidators) {
      if (validator.name === 'required') {
        this._required = true;
        break;
      }
    }
  }

  /**
   * Apply the touched observable on ngControl and control fields
   */
  private initCheckForTouch(): void {
    (this.control as any)._markAsTouched = this.control.markAsTouched;
    this.control.markAsTouched = () => {
      (this.control as any)._markAsTouched();
      this.touched$.next(true);
    };
  }

  /**
   * Writes a new value to the element.
   *
   * This method is called by the forms API to write to the view when programmatic
   * changes from model to view are requested.
   *
   * @param value The new value for the element
   */
  writeValue(value: any): void {}

  /**
   * Registers a callback function that is called when the control's value changes in the UI.
   *
   * This method is called by the forms API on initialization to update the form model when values propagate from the view to the model.
   * @param fn Callback to be called when the control value changes.
   */
  registerOnChange(fn: any): void {}

  /**
   * Registers a callback function that is called by the forms API on initialization to update the form model on blur.
   *
   * @param fn Callback to be called when the control is touched.
   */
  registerOnTouched(fn: any): void {}

  /**
   * Set disabled state on the control. If set to true, the control will be disabled.
   * @param isDisabled State to set to the control
   */
  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.touched$.complete();
  }
}
