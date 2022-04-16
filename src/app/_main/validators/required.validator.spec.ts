import { FormControl } from '@angular/forms';
import { emailValidator } from './email.validator';
import { requiredValidator } from './required.validator';

describe('Test required validator', () => {
  const validator = requiredValidator();

  it('should not match empty string', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeTruthy();
  });

  it('should not match null', () => {
    const control = new FormControl(null);
    expect(validator(control)).toBeTruthy();
  });

  it('should not match undefined', () => {
    const control = new FormControl(undefined);
    expect(validator(control)).toBeTruthy();
  });

  it('should match ABC string', () => {
    const control = new FormControl('ABC');
    expect(validator(control)).toBeNull();
  });

  it('should match Hello World! string', () => {
    const control = new FormControl('Hello World!');
    expect(validator(control)).toBeNull();
  });
});
