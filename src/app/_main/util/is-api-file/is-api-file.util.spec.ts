import { isApiFile } from './is-api-file.util';

describe('isApiFile', () => {
  it('should return true if object is an ApiFile', () => {
    const apiFile = {
      uploaded: new Date(),
      hash: 'hash',
      contentType: 'contentType',
      url: 'url',
    };
    expect(isApiFile(apiFile)).toBe(true);
  });

  it('should return false if object is not an ApiFile', () => {
    const notApiFile = {
      uploaded: new Date(),
      hash: 'hash',
      contentType: 'contentType',
    };
    expect(isApiFile(notApiFile)).toBe(false);
  });
});
