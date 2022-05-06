import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskPriority',
})
export class TaskPriorityPipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case 'lowest':
        return $localize`Lowest`;
      case 'low':
        return $localize`Low`;
      case 'medium':
        return $localize`Medium`;
      case 'high':
        return $localize`High`;
      case 'highest':
        return $localize`Highest`;
    }
  }
}
