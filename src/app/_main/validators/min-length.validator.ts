import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../interfaces/validation-error.interface';

/**
 * Validator to check if the length is not lesser than specyfic number, but is different than 0
 * @returns {ValidatorFn}
 */
export function minLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    if (control.value == null) {
      return null;
    }

    if (control.value.length < length && control.value.length != 0) {
      return {
        type: 'min-length',
        message: $localize`Length should not be lesser than ${length}`,
      };
    }
    return null;
  };
}
