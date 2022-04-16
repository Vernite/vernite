import { Utils } from './utils.class';

describe('Utils: regexIndexOf', () => {
  it("Should split faIcon to ['fa', 'Icon']", () => {
    const faIcon = 'faIcon';
    const expected = ['fa', 'Icon'];
    const splitIndex = Utils.regexIndexOf(faIcon, /[A-Z]/);
    const prefix = faIcon.substring(0, splitIndex);
    const name = faIcon.substring(splitIndex);
    const actual = [prefix, name];
    expect(actual).toEqual(expected);
  });

  it('Should return -1 for test', () => {
    const splitIndex = Utils.regexIndexOf('test', /[A-Z]/);
    expect(splitIndex).toBe(-1);
  });
});
