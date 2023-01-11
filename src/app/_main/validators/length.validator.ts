import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../interfaces/validation-error.interface';

/**
 * Validator to check if the length is not lesser or greater than specyfic numbers, but is different than 0
 * @returns {ValidatorFn}
 */
export function lengthValidator(min_length: number, max_length: number): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    if (control.value.length > max_length) {
      return {
        type: 'max-length',
        message: $localize`Length should not be greater than ${max_length}`,
      };
    } else if (control.value.length < min_length && control.value.length != 0) {
      return {
        type: 'min-length',
        message: $localize`Length should not be lesser than ${min_length}`,
      };
    }
    return null;
  };
}
