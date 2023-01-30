import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs';

/** Validates form if every value in form is valid */
export function validateForm(form: FormGroup<any>) {
  form.markAllAsTouched();
  (<any>form)._updateTreeValidity();
  return form.valid;
}

/** Marks control as touched and check validity of the control */
export function validateControl(control: FormControl<any>) {
  control.markAllAsTouched();
  control.updateValueAndValidity();
  return control.valid;
}

/**
 * Connects a control to a form group
 * @param component Component to be connected to control (tested if destroyed)
 * @param form Form to be tested
 * @param control Control to be tested
 */
export function connectFormToControl(
  component: any,
  form: FormGroup<any>,
  control: FormControl<any>,
) {
  let eventFromItself = false;

  form.valueChanges
    .pipe(
      untilDestroyed(component),
      filter(() => !eventFromItself),
    )
    .subscribe((value) => {
      eventFromItself = true;
      control.setValue(value);
      eventFromItself = false;
    });

  control.valueChanges
    .pipe(
      untilDestroyed(component),
      filter(() => !eventFromItself),
    )
    .subscribe((value) => {
      eventFromItself = true;
      form.patchValue(value);
      eventFromItself = false;
    });
}
