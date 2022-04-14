import { FormControl } from '@angular/forms';
import { emailValidator } from './email.validator';

describe('Test email validator', () => {
  const validator = emailValidator();

  it('should match empty string', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeNull();
  });

  it('should match marc999.mc@gmail.com', () => {
    const control = new FormControl('marc999.mc@gmail.com');
    expect(validator(control)).toBeNull();
  });

  it('should not match ABC', () => {
    const control = new FormControl('ABC');
    expect(validator(control)).toBeTruthy();
  });
});
