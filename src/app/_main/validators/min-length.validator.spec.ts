import { FormControl } from '@ngneat/reactive-forms';
import { minLengthValidator } from './min-length.validator';

describe('Test length limit validator', () => {
  const validator = minLengthValidator(1);

  it('should pass', () => {
    const control = new FormControl('1');
    expect(validator(control)).toBeNull();
  });

  it('should not pass', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeTruthy();
  });
});
