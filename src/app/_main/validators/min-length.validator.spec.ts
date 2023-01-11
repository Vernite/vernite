import { FormControl } from '@ngneat/reactive-forms';
import { expectToFail, expectToPass } from '@tests/helpers/validator-testing.helper';
import { minLengthValidator } from './min-length.validator';

describe('Test minimum length limit validator', () => {
  const validator = minLengthValidator(3);

  it('should pass', () => {
    const control = new FormControl('abc');
    expectToPass(validator(control));
  });

  it('should pass', () => {
    const control = new FormControl('');
    expectToPass(validator(control));
  });

  it('should not pass', () => {
    const control = new FormControl('a');
    expectToFail(validator(control));
  });
});
