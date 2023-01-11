import { FormControl } from '@ngneat/reactive-forms';
import { expectToFail, expectToPass } from '@tests/helpers/validator-testing.helper';
import { booleanValidator } from './boolean.validator';

describe('Test boolean validator', () => {
  const validator = booleanValidator();

  it('should pass', () => {
    const control = new FormControl(true);
    expectToPass(validator(control));
  });

  it('should pass', () => {
    const control = new FormControl(false);
    expectToPass(validator(control));
  });

  it('should not pass', () => {
    const control = new FormControl(null);
    expectToFail(validator(control));
  });
});
