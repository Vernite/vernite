import { FormGroup } from '@ngneat/reactive-forms';

export function validateForm(form: FormGroup<any>) {
  form.markAllAsTouched();
  (<any>form)._updateTreeValidity();
  return form.valid;
}
