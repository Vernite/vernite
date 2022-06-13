import { FilterCheckbox } from '@main/interfaces/filters.interface';
import { Task } from '@tasks/interfaces/task.interface';

export class Filters {
  public static ONLY_MY_TASKS(currentUserId: string): FilterCheckbox<any> {
    return {
      type: 'checkbox',
      label: $localize`Only my tasks`,
      options: {
        1: { assigneeId: currentUserId },
        0: {},
      },
      value: 0,
      apply(tasks: Task[], option: { assigneeId?: string }) {
        return tasks.filter((task) => task.assigneeId === option.assigneeId);
      },
    };
  }
}
