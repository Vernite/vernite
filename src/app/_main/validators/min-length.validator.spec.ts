import { FormControl } from '@ngneat/reactive-forms';
import { expectToFail, expectToPass } from '@tests/helpers/validator-testing.helper';
import { minLengthValidator } from './min-length.validator';

describe('Test minimum length limit validator', () => {
  const validator = minLengthValidator(1);

  it('should pass', () => {
    const control = new FormControl('1');
    expectToPass(validator(control));
  });

  it('should not pass', () => {
    const control = new FormControl('');
    expectToFail(validator(control));
  });
});
