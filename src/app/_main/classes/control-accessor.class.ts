import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, merge, Subject, takeUntil } from 'rxjs';

@Component({
  template: '',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ControlAccessor implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() autocomplete: 'on' | 'off' = 'off';
  @Input() cdkFocusInitial: boolean = false;

  public required: boolean = false;
  public control: FormControl = new FormControl();

  private destroy$ = new Subject();
  private touched$ = new Subject();

  public get value(): any {
    return this.control.value;
  }

  public get errors(): ValidationErrors | null {
    return this.control.errors;
  }

  constructor(public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.initCheckForTouch();
    this.checkIfIsRequired();
  }

  private checkIfIsRequired() {
    if (!this.ngControl.control) return;

    for (const validator of (this.ngControl as any).control._rawValidators) {
      if (validator.name === 'required') {
        this.required = true;
        break;
      }
    }
  }

  private initCheckForTouch() {
    if (!this.ngControl.control) return;

    (this.ngControl.control as any)._markAsTouched = this.ngControl.control?.markAsTouched;
    this.ngControl.control!.markAsTouched = () => {
      (this.ngControl.control as any)._markAsTouched();
      (this.control as any)._markAsTouched();
    };

    (this.control as any)._markAsTouched = this.control.markAsTouched;
    this.control.markAsTouched = () => {
      (this.control as any)._markAsTouched();
      this.touched$.next(true);
    };
  }

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      fn(value);
    });
  }

  registerOnTouched(fn: any): void {
    this.touched$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      fn(value);
    });
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.touched$.complete();
  }
}
