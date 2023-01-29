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

  it('should return a random number between 0 and 10', () => {
    const random = new Random(1).range(0, 10);
    expect(random).toBeGreaterThanOrEqual(0);
    expect(random).toBeLessThanOrEqual(10);
  });

  it('should return a random number between 0 and 10 with step 2', () => {
    const random = new Random(1).range(0, 10, 2);
    expect(random).toBeGreaterThanOrEqual(0);
    expect(random).toBeLessThanOrEqual(10);
    expect(random % 2).toBe(0);
  });

  it('should return a random number in fixed range between 1 and 10', () => {
    const random = new Random(1).fixedRange(1, 10);
    expect(random).toBeGreaterThanOrEqual(1);
    expect(random).toBeLessThanOrEqual(10);
    expect(random % 1).toBe(0);
  });
});
