import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../interfaces/validation-error.interface';

export function requiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    if (control.value === null || control.value === undefined || control.value === '') {
      return { type: 'required', message: $localize`This field is required` };
    }
    return null;
  };
}
