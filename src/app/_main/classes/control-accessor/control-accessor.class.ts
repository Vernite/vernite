import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { AbstractControl, NgControl, Validator, ValidatorFn } from '@angular/forms';
import { ControlValueAccessor } from '@ngneat/reactive-forms';
import { ValidationError } from '@main/interfaces/validation-error.interface';
import { FormControl } from '@ngneat/reactive-forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { requiredValidator } from '../../validators/required.validator';

/**
 * A base class for creating custom control accessors like inputs, checkboxes, etc.
 */
@UntilDestroy()
@Component({
  template: '',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ControlAccessor<T = any>
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
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

  /** Name of the control */
  public get name() {
    return this.ngControl?.name?.toString() || '';
  }

  /** Property to define if control is fully initialized */
  public get isControlInitialized() {
    return Boolean(this.ngControl?.control);
  }

  /**
   * Private property to set field as required
   *
   * @ignore
   */
  private _required: boolean = false;

  /**
   * Control that is used by the form.
   */
  public get control(): FormControl<T> {
    return ((this.ngControl as any)?.control as FormControl<T>) || new FormControl<T>();
  }

  /**
   * Observable that emits when the control is destroyed.
   *
   * @ignore
   */
  protected destroy$: Subject<null> = new Subject();

  /**
   * Observable that emits when the control is touched.
   *
   * @ignore
   */
  protected touched$: Subject<boolean> = new Subject();

  /** validators list observable (triggered after every validators list change) */
  protected validators$ = new BehaviorSubject([] as ValidatorFn[]);

  /** Get the value of the control. */
  public get value(): T {
    return this.control.value;
  }

  /** Previous value getter */
  public get previousValue(): T | undefined {
    return this._previousValue;
  }

  /** Errors object getter */
  public get errors() {
    return this.control.errors;
  }

  /** Control used to display data in other format than value stored in main control */
  protected displayControl: FormControl<any> | undefined;

  /** @ignore */
  private _previousValue: T | undefined = undefined;

  /** @ignore */
  private _previousValueBuffer: T | undefined = undefined;

  /** @ignore */
  private _interceptedAlready: boolean = false;

  /** @ignore */
  private _displayControlInit: boolean = false;

  /**
   * Accessor constructor to initialize component. Extended by child classes.
   * @param ngControl control to be used by the accessor
   */
  constructor(
    /**
     * Control passed from DOM to the component, contains all the information about form control
     */
    @Optional() public ngControl: NgControl,
    protected cdRef: ChangeDetectorRef,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this._watchForInit();
  }

  /** @ignore */
  private _watchForInit() {
    const afterSetup = () => {
      this._checkIfIsRequired();
      this._initValidation();
      this._initDisplayControl();

      this.ngAfterControlInit();
    };

    if (this.ngControl.control) {
      return afterSetup();
    }

    const _setUpControl = (this.ngControl as any)._setUpControl;
    (this.ngControl as any)._setUpControl = (...args: any[]) => {
      const tmp = _setUpControl.apply(this.ngControl, ...args);

      afterSetup();
      return tmp;
    };
  }

  /**
   * Check if the control is required by provided validators.
   *
   * @ignore
   */
  private _checkIfIsRequired(): void {
    if (!(this.control as any)._rawValidators) return;

    for (const validator of (this.ngControl as any).control._rawValidators) {
      if (validator.name === 'required') {
        this.markAsRequired();
        break;
      } else {
        this.markAsOptional();
      }
    }
  }

  /** @ignore */
  private _initValidation(): void {
    this.control.addValidators((control: AbstractControl) => this.validate(control));
    this.validators$.next((this.ngControl as any).control._rawValidators);
  }

  /** @ignore */
  private _interceptValueChange(control: AbstractControl) {
    if (this._interceptedAlready) return;
    this._interceptedAlready = true;
    control.setValue(this.parseValue(control.value), {
      emitModelToViewChange: false,
      emitEvent: false,
      emitViewToModelChange: false,
    });
    setTimeout(() => (this._interceptedAlready = false));
  }

  /** @ignore */
  private _initDisplayControl() {
    if (this._displayControlInit || !this.displayControl) return;

    this.control.errors$.pipe(untilDestroyed(this)).subscribe((errors) => {
      this.displayControl?.setErrors(errors);
    });
    this.control.touch$.pipe(untilDestroyed(this)).subscribe((touched) => {
      if (touched) {
        this.displayControl?.markAsTouched();
      } else {
        this.displayControl?.markAsUntouched();
      }
    });
    this.validators$.subscribe((validators) => {
      if (validators.some((v) => v.name === 'required')) {
        this.displayControl?.setValidators([requiredValidator()]);
      }
    });
    this._displayControlInit = true;
  }

  validate(control: AbstractControl): null | ValidationError {
    this._interceptValueChange(control);
    this._checkForValidatorsChange();
    return null;
  }

  /**
   * Writes a new value to the element.
   *
   * This method is called by the forms API to write to the view when programmatic
   * changes from model to view are requested.
   *
   * @param value The new value for the element
   */
  writeValue(value: T): void {
    this._previousValue = this._previousValueBuffer;
    this._previousValueBuffer = value;
  }

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
    this.control.setDisable(isDisabled);
  }

  /**
   * Method to parse value to the correct type.
   * @param value value to parse
   * @returns value parsed to correct type (defined in control class)
   */
  parseValue(value: any): T {
    return value;
  }

  /** mark field as required (add required flag) */
  markAsRequired() {
    this._required = true;
  }

  /** mark field as optional (remove required flag) */
  markAsOptional() {
    this._required = false;
  }

  /** @ignore */
  _checkForValidatorsChange() {
    const previousValidators = this.validators$.value;
    const currentValidators = (this.ngControl as any).control._rawValidators;

    if (
      previousValidators.length !== currentValidators.length ||
      !currentValidators.every((v: any, i: number) => v === previousValidators[i])
    ) {
      this.validators$.next(currentValidators);
    }
  }

  /** @ignore */
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.touched$.complete();
  }

  /** Method called after control initialization */
  ngAfterControlInit(): void {}
}
