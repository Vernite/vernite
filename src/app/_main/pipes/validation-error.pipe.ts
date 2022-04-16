import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validationError',
})
export class ValidationErrorPipe implements PipeTransform {
  /**
   *
   * @param value - The value to be transformed
   * @returns message from validation error
   */
  transform(value: any): any {
    return value?.message || null;
  }
}
