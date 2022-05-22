import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationError } from '../interfaces/validation-error.interface';

/**
 * Validator to check if password is valid
 * @returns {ValidatorFn}
 */
export function sameAsValidator(compareWith: string, message: string): ValidatorFn {
  // This variable will prevent subscribing again for value changes in it's compare control
  let alreadySubscribed = false;

  return (control: AbstractControl): ValidationError | null => {
    let compareField = control.parent?.get(compareWith);

    if (!alreadySubscribed && compareField) {
      compareField?.valueChanges.subscribe((val) => {
        if (control.touched) {
          control.updateValueAndValidity();
        }
      });
      alreadySubscribed = true;
    }

    if (control.value !== compareField?.value) {
      return {
        type: 'same-as',
        message: message,
      };
    }
    return null;
  };
}
