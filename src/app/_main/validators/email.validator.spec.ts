import { FormControl } from '@angular/forms';
import { expectToFail, expectToPass } from '@tests/helpers/validator-testing.helper';
import { emailValidator } from './email.validator';

describe('Test email validator', () => {
  const validator = emailValidator();

  it('should match empty string', () => {
    const control = new FormControl('');
    expectToPass(validator(control));
  });

  it('should match mc.mc@gmail.com', () => {
    const control = new FormControl('marc999.mc@gmail.com');
    expectToPass(validator(control));
  });

  it('should match aniA@gmail.com', () => {
    const control = new FormControl('aniA@gmail.com');
    expectToPass(validator(control));
  });

  it('should match anią@gmail.com', () => {
    const control = new FormControl('anią@gmail.com');
    expectToPass(validator(control));
  });

  it('should not match ABC', () => {
    const control = new FormControl('ABC');
    expectToFail(validator(control));
  });

  it('Should match 伊昭傑@郵件.商務', () => {
    const control = new FormControl('伊昭傑@郵件.商務');
    expectToPass(validator(control));
  });

  it('ाम@मोहन.ईन्फो', () => {
    const control = new FormControl('ाम@मोहन.ईन्फो');
    expectToPass(validator(control));
  });

  it('FoO@BaR.CoM', () => {
    const control = new FormControl('FoO@BaR.CoM');
    expectToPass(validator(control));
  });

  it('should not match test.test', () => {
    const control = new FormControl('test.test');
    expectToFail(validator(control));
  });
});
