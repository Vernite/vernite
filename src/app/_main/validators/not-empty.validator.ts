import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../interfaces/validation-error.interface';

/**
 * Validator to check if value was provided
 * @returns {ValidatorFn}
 */
export function notEmptyValidator(): ValidatorFn {
  return function notEmpty(control: AbstractControl): ValidationError | null {
    if (control.value && control.value.trim() === '') {
      return { type: 'not-empty', message: $localize`This field cannot consist of only spaces` };
    }
    return null;
  };
}
