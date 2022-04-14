import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validationError',
})
export class ValidationErrorPipe implements PipeTransform {
  transform(value: any): any {
    return value?.message || null;
  }
}
