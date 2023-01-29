import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../interfaces/validation-error.interface';

/**
 * Validator to check if the variable is a boolean
 * @returns {ValidatorFn}
 */
export function booleanValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    if (control.value !== true && control.value !== false) {
      return {
        type: 'boolean',
        message: $localize`It should be a boolean`,
      };
    }
    return null;
  };
}
