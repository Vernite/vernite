import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskType',
})
export class TaskTypePipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case 'task':
        return $localize`Task`;
      case 'user-story':
        return $localize`User story`;
      case 'issue':
        return $localize`Issue`;
      case 'epic':
        return $localize`Epic`;
    }
  }
}
