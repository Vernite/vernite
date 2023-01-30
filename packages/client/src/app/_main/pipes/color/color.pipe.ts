import { Pipe, PipeTransform } from '@angular/core';
import * as Color from 'color';

/**
 * Color pipe - transform color
 */
@Pipe({
  name: 'color',
})
export class ColorPipe implements PipeTransform {
  /**
   * Transform color
   * @param value calue to transform to color
   * @param type type of color to return
   * @returns transformed color (in specified string format)
   */
  transform(value: string | Color | null, type: 'hex' | 'rgb' | 'hsv'): any {
    if (!value) return null;
    if (typeof value === 'string') {
      value = Color(value);
    }

    switch (type) {
      case 'hex':
        return value.hex();
      case 'rgb':
        return value.rgb().string();
      case 'hsv':
        return value.hsv().string();
    }
  }
}
