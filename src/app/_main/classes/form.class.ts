import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs';

export function validateForm(form: FormGroup<any>) {
  form.markAllAsTouched();
  (<any>form)._updateTreeValidity();
  return form.valid;
}

export function validateControl(control: FormControl<any>) {
  control.markAllAsTouched();
  control.updateValueAndValidity();
  return control.valid;
}

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
