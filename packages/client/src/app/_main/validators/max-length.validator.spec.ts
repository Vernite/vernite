import { FormControl } from '@ngneat/reactive-forms';
import { expectToFail, expectToPass } from '@tests/helpers/validator-testing.helper';
import { maxLengthValidator } from './max-length.validator';

describe('Test maximum length limit validator', () => {
  const validator = maxLengthValidator(50);

  it('should pass', () => {
    const control = new FormControl('a0123456789');
    expectToPass(validator(control));
  });

  it('should not pass', () => {
    const control = new FormControl('012345678901234567890123456789012345678901234567890');
    expectToFail(validator(control));
  });
});
