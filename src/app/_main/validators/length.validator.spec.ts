import { FormControl } from '@ngneat/reactive-forms';
import { lengthValidator } from './length.validator';

describe('Test length limit validator', () => {
  const validator = lengthValidator(1, 50);

  it('should pass', () => {
    const control = new FormControl('a0123456789');
    expect(validator(control)).toBeNull();
  });

  it('should pass', () => {
    const control = new FormControl('1');
    expect(validator(control)).toBeNull();
  });

  it('should not pass', () => {
    const control = new FormControl('012345678901234567890123456789012345678901234567890');
    expect(validator(control)).toBeTruthy();
  });

  it('should not pass', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeTruthy();
  });
});
