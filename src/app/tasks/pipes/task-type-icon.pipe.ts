import { Pipe, PipeTransform } from '@angular/core';
import { TaskType } from '@tasks/enums/task-type.enum';

@Pipe({
  name: 'taskTypeIcon',
})
export class TaskTypeIconPipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case TaskType.TASK:
        return 'cuTask';
      case TaskType.ISSUE:
        return 'cuIssue';
      case TaskType.EPIC:
        return 'cuEpic';
      case TaskType.USER_STORY:
        return 'cuUserStory';
    }
  }
}
