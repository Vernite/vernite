export class Random {
  private m_w = 123456789;
  private m_z = 987654321;
  private mask = 0xffffffff;

  /**
   * Random number generation class with optional seed
   * @param seed the seed to use in random number generation
   */
  constructor(seed: number = new Date().getTime()) {
    this.m_w = (123456789 + seed) & this.mask;
    this.m_z = (987654321 - seed) & this.mask;
  }

  /**
   * Returns number between 0 (inclusive) and 1.0 (exclusive),
   * just like Math.random().
   */
  public random() {
    this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & this.mask;
    this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >> 16)) & this.mask;
    let result = ((this.m_z << 16) + (this.m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
  }

  /**
   * Returns number from range
   * @param start start number (inclusive)
   * @param end end number (inclusive)
   * @param step optional step between random numbers
   */
  public range(start: number, end: number, step?: number) {
    const diff = Math.abs(end - start);
    const min = Math.min(start, end);

    if (step) {
      const count = Math.floor(diff / step);
      return Math.floor(this.random() * count) * step + min;
    } else {
      return this.random() * diff + min;
    }
  }

  /**
   * Returns fixed number (integer) from range
   * @param start start number (inclusive)
   * @param end end number (inclusive)
   */
  public fixedRange(start: number, end: number) {
    return this.range(start, end, 1);
  }
}
