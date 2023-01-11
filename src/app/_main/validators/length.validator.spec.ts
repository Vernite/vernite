import { FormControl } from '@ngneat/reactive-forms';
import { expectToFail, expectToPass } from '@tests/helpers/validator-testing.helper';
import { lengthValidator } from './length.validator';

describe('Test length limit validator', () => {
  const validator = lengthValidator(1, 50);

  it('should pass', () => {
    const control = new FormControl('a0123456789');
    expectToPass(validator(control));
  });

  it('should pass', () => {
    const control = new FormControl('1');
    expectToPass(validator(control));
  });

  it('should not pass', () => {
    const control = new FormControl('012345678901234567890123456789012345678901234567890');
    expectToFail(validator(control));
  });

  it('should not pass', () => {
    const control = new FormControl('');
    expectToFail(validator(control));
  });
});
