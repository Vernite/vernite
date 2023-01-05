import { Pipe, PipeTransform } from '@angular/core';

/**
 * Reverse pipe - reverse array
 */
@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  /**
   * Reverse array
   * @param value - array to reverse
   * @returns reversed array
   */
  transform(value: any): any {
    if (!value) return value;
    return value.slice().reverse();
  }
}
