import { FormControl } from '@angular/forms';
import { maxLengthValidator } from './max-length.validator';

describe('Test length limit validator', () => {
  const validator = maxLengthValidator(50);

  it('should pass', () => {
    const control = new FormControl('a0123456789');
    expect(validator(control)).toBeNull();
  });

  it('should not pass', () => {
    const control = new FormControl('012345678901234567890123456789012345678901234567890');
    expect(validator(control)).toBeTruthy();
  });
});
