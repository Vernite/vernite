import { Pipe, PipeTransform } from '@angular/core';
import Color from 'color';

@Pipe({
  name: 'contrastColor',
})
export class ContrastColorPipe implements PipeTransform {
  transform(value: any, luminosityCap: number = 0.1): string {
    const color = Color(value);
    return color.luminosity() > luminosityCap ? 'light' : 'dark';
  }
}
