import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../interfaces/validation-error.interface';

/**
 * Validator to check if the length is not lesser than specyfic number
 * @returns {ValidatorFn}
 */
export function minLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationError | null => {
    if (control.value.length > length) {
      return {
        type: 'min-length',
        message: $localize`Length should not be lesser than ${length}`,
      };
    }
    return null;
  };
}
