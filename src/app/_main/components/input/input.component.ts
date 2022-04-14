import {
  Component,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() required: boolean = false;
  @Input() floatingLabel?: string;
  @Input() staticLabel?: string;
  @Input() placeholder: string = '';
  @Input() hint?: string;
  @Input() autocomplete: 'on' | 'off' = 'off';

  ngControl?: NgControl;

  public control = new FormControl();
  public error: any = null;

  private destroy$ = new Subject();
  private touched$ = new BehaviorSubject(false);

  constructor(@Optional() private inj: Injector) {}

  validate(): ValidationErrors | null {
    const validator = this.ngControl?.control?.validator;
    const errors = validator?.(this.control) || null;
    this.control.setErrors(errors);
    return errors;
  }

  ngOnInit() {
    (this.control as any)._markAsTouched = this.control.markAsTouched;
    this.control.markAsTouched = () => {
      (this.control as any)._markAsTouched();
      this.touched$.next(true);
    };

    this.control.valueChanges.subscribe((val) => {
      this.validate();
    });

    this.ngControl = this.inj.get(NgControl);
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

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.touched$.complete();
  }
}
