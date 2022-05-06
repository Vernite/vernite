import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskPriorityIcon',
})
export class TaskPriorityIconPipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case 'lowest':
        return 'cuPriorityLowest';
      case 'low':
        return 'cuPriorityLow';
      case 'medium':
        return 'cuPriorityMedium';
      case 'high':
        return 'cuPriorityHigh';
      case 'highest':
        return 'cuPriorityHighest';
    }
  }
}
