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

describe('Utils: snakeCase', () => {
  it('Should return snake_case for snake_case', () => {
    const snakeCase = 'snake_case';
    const expected = 'snake_case';
    const actual = Utils.snakeCase(snakeCase);
    expect(actual).toEqual(expected);
  });

  it('Should return snake_case for SnakeCase', () => {
    const snakeCase = 'SnakeCase';
    const expected = 'snake_case';
    const actual = Utils.snakeCase(snakeCase);
    expect(actual).toEqual(expected);
  });

  it('Should return snake_case for snakeCase', () => {
    const snakeCase = 'snakeCase';
    const expected = 'snake_case';
    const actual = Utils.snakeCase(snakeCase);
    expect(actual).toEqual(expected);
  });
});

describe('Utils: isLetter', () => {
  const shouldReturnTrueFor = (char: string) => {
    it(`Should return true for ${char}`, () => {
      expect(Utils.isLetter(char)).toBeTruthy();
    });
  };

  const shouldReturnFalseFor = (char: string) => {
    it(`Should return false for ${char}`, () => {
      expect(Utils.isLetter(char)).toBeFalse();
    });
  };

  shouldReturnTrueFor('A');
  shouldReturnTrueFor('a');
  shouldReturnTrueFor('Z');
  shouldReturnTrueFor('z');

  shouldReturnFalseFor('1');
  shouldReturnFalseFor('!');
  shouldReturnFalseFor('@');
  shouldReturnFalseFor('_');
  shouldReturnFalseFor('AB');
});

describe('Utils: has', () => {
  it('Should return true for object with all keys', () => {
    const obj = {
      key1: 'value1',
      key2: 'value2',
    };

    expect(Utils.has(obj, ['key1', 'key2'])).toBeTruthy();
  });

  it('Should return false for object without all keys', () => {
    const obj = {
      key1: 'value1',
    };

    expect(Utils.has(obj, ['key1', 'key2'])).toBeFalsy();
  });
});
