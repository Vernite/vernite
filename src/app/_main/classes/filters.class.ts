import { FilterCheckbox } from '@main/interfaces/filters.interface';
import { Task } from '@tasks/interfaces/task.interface';

/** @TODO: split this class into modules */

export class Filters {
  public static ONLY_MY_TASKS(currentUserId: number): FilterCheckbox<{ assigneeId?: number }> {
    return {
      type: 'checkbox',
      label: $localize`Only my tasks`,
      options: {
        1: { assigneeId: currentUserId },
        0: {},
      },
      value: 0,
      apply(tasks: Task[], option) {
        return tasks.filter((task) =>
          option.assigneeId ? task.assigneeId === option.assigneeId : true,
        );
      },
    };
  }

  public static TASKS_BY_USER(userId: number):
}
