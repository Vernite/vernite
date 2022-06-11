import { Random } from '@main/classes/random.class';
import * as Color from 'color';

export class UserUtils {
  public static getColorById(id: number): Color {
    const random = new Random(id);
    const randomNumber = random.random();
    const hue = randomNumber * 255;
    return Color.hsl(hue, 95, 41);
  }

  /**
   * @unsupported
   */
  public static getColorByUsername(username: string): Color {
    let numberRepresentation = username
      .split('')
      .map((c) => c.charCodeAt(0))
      .reduce((sum, n) => sum * 10 ** 6 + n, 0);

    // This requires some tweaks to make the number smaller.
    numberRepresentation = numberRepresentation / 10000000;

    const random = new Random(numberRepresentation);
    const randomNumber = random.random();
    const hue = randomNumber * 255;
    return Color.hsl(hue, 95, 41);
  }
}
