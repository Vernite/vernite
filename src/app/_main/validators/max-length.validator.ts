import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../interfaces/validation-error.interface';

/**
 * Validator to check if the length is not greater than specyfic number
 * @returns {ValidatorFn}
 */
export function maxLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    if (control.value == null) {
      return null;
    }

    if (control.value.length > length) {
      return {
        type: 'max-length',
        message: $localize`Length should not be greater than ${length}`,
      };
    }
    return null;
  };
}
