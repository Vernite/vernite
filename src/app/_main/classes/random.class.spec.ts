import { Random } from './random.class';

describe('Random class', () => {
  it('should return a random number between 0 and 1', () => {
    const random = new Random().random();
    expect(random).toBeGreaterThanOrEqual(0);
    expect(random).toBeLessThanOrEqual(1);
  });

  it('should return different numbers with different seeds', () => {
    const random1 = new Random(1).random();
    const random2 = new Random(2).random();
    expect(random1).not.toBe(random2);
  });

  it('should return the same number with the same seed', () => {
    const random1 = new Random(1).random();
    const random2 = new Random(1).random();
    expect(random1).toBe(random2);
  });
});
