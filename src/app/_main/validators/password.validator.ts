import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../interfaces/validation-error.interface';

/**
 * Validator to check if password is valid
 * @returns {ValidatorFn}
 */
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    if (control.value && !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(control.value)) {
      return {
        type: 'password',
        message: $localize`Password requires minimum eight characters, at least one letter and one number`,
      };
    }
    return null;
  };
}
