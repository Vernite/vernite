import { FormControl } from '@angular/forms';
import { passwordValidator } from './password.validator';

describe('Test password validator', () => {
  const validator = passwordValidator();

  it('should match empty string', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeNull();
  });

  it('should match abcdefg14', () => {
    const control = new FormControl('abcdefg14');
    expect(validator(control)).toBeNull();
  });

  it('should not match abcdefgh', () => {
    const control = new FormControl('abcdefgh');
    expect(validator(control)).toBeTruthy();
  });

  it('should not match 17283940', () => {
    const control = new FormControl('abcde17');
    expect(validator(control)).toBeTruthy();
  });

  it('should not match abc666', () => {
    const control = new FormControl('abc666');
    expect(validator(control)).toBeTruthy();
  });
});
