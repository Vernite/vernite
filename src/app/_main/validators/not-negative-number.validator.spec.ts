import { FormControl } from '@ngneat/reactive-forms';
import { expectToFail, expectToPass } from '@tests/helpers/validator-testing.helper';
import { notNegativeNumberValidator } from './not-negative-number.validator';

describe('Test non negative number validator', () => {
  const validator = notNegativeNumberValidator();

  it('should pass', () => {
    const control = new FormControl(10);
    expectToPass(validator(control));
  });

  it('should not pass', () => {
    const control = new FormControl(-1);
    expectToFail(validator(control));
  });
});
