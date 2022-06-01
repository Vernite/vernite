import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskType',
})
export class TaskTypePipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case 'TASK':
        return $localize`Task`;
      case 'USER_STORY':
        return $localize`User story`;
      case 'ISSUE':
        return $localize`Issue`;
      case 'EPIC':
        return $localize`Epic`;
      case 'SUBTASK':
        return $localize`Subtask`;
      default:
        console.warn('Unknown task type:', value);
        return value;
    }
  }
}
