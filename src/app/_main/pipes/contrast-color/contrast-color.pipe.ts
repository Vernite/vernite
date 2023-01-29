import { Pipe, PipeTransform } from '@angular/core';
import Color from 'color';

/**
 * Contrast color pipe - get contrast color
 */
@Pipe({
  name: 'contrastColor',
})
export class ContrastColorPipe implements PipeTransform {
  /**
   * Get contrast color
   * @param value color to transform
   * @param luminosityCap luminosity cap to determine contrast color (default: 0.1)
   * @returns contrast color
   */
  transform(value: any, luminosityCap: number = 0.1): string {
    const color = Color(value);
    return color.luminosity() > luminosityCap ? 'light' : 'dark';
  }
}
