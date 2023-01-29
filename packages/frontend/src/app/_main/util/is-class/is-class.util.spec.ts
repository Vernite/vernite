import { isClass } from './is-class.util';

describe('isClass', () => {
  it('should return true if object is a class', () => {
    class TestClass {}
    expect(isClass(TestClass)).toBe(true);
  });

  it('should return false if object is not a class', () => {
    const notAClass = {};
    expect(isClass(notAClass)).toBe(false);
    expect(isClass(() => {})).toBe(false);
    expect(isClass(Promise.resolve())).toBe(false);
  });
});
