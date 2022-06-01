import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskTypeIcon',
})
export class TaskTypeIconPipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case 'TASK':
        return 'cuTask';
      case 'ISSUE':
        return 'cuIssue';
      case 'EPIC':
        return 'cuEpic';
      case 'USER_STORY':
        return 'cuUserStory';
      case 'SUBTASK':
        return 'cuSubtask';
    }
  }
}
