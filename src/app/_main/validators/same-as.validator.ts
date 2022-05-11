import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../interfaces/validation-error.interface';

/**
 * Validator to check if password is valid
 * @returns {ValidatorFn}
 */
export function sameAsValidator(compareWith: string, message: string): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    let compareField = control.parent?.get(compareWith);
    if (control.value !== compareField?.value) {
      return {
        type: 'same-as',
        message: message,
      };
    }
    return null;
  };
}
