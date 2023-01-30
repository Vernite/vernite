import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../interfaces/validation-error.interface';

/**
 * Validator to check if value was provided
 * @returns {ValidatorFn}
 */
export function requiredValidator(options: { full?: boolean } = {}): ValidatorFn {
  return function required(control: AbstractControl): ValidationError | null {
    if (
      (options.full && !control.value) ||
      control.value === null ||
      control.value === undefined ||
      control.value === '' ||
      control.value === false
    ) {
      return { type: 'required', message: $localize`This field is required` };
    }
    return null;
  };
}
