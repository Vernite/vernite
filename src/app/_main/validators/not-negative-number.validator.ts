import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../interfaces/validation-error.interface';

/**
 * Validator to check if the number is not negative
 * @returns {ValidatorFn}
 */
export function notNegativeNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    if (control.value < 0) {
      return {
        type: 'not-negative-number',
        message: $localize`Number should not be negative`,
      };
    }
    return null;
  };
}
