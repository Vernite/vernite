import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { sameAsValidator } from './same-as.validator';

describe('Test if two values are the same', () => {
  // it('should be valid if passwords are the same', () => {
  //   const form = new FormGroup({
  //     password: new FormControl('abcd1234', [], []),
  //     repeatPassword: new FormControl('abcd1234', [sameAsValidator('password', ``)], []),
  //   });
  //   form.updateValueAndValidity();
  //   expect(form.valid).toBeTruthy();
  // });

  it('should throw error if passwords are different', () => {
    const form = new FormGroup({
      password: new FormControl('1234abcd', [], []),
      repeatPassword: new FormControl('abcd1234', [sameAsValidator('password', ``)], []),
    });
    form.updateValueAndValidity();
    expect(form.valid).toBeFalse();
  });
});
