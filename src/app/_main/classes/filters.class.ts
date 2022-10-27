import { FilterCheckbox, FilterSelect } from '@main/interfaces/filters.interface';
import { TaskType } from '@tasks/enums/task-type.enum';
import { Task } from '@tasks/interfaces/task.interface';
import { Enum } from './enum.class';

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
      apply(tasks: Task[]) {
        const option = this.options[this.value];
        if (!option) return tasks;

        return tasks.filter((task) =>
          option.assigneeId ? task.assigneeId === option.assigneeId : true,
        );
      },
    };
  }

  public static TASK_TYPE(defaultTaskType: TaskType): FilterSelect<TaskType> {
    return {
      type: 'select',
      label: $localize`Task type`,
      options: Enum.entries(TaskType).map(([label, value]) => ({
        label,
        value,
      })),
      value: defaultTaskType || null,
      apply(tasks: Task[]) {
        if (this.value === null) return tasks;

        return tasks.filter((task) => task.type === this.value);
      },
    };
  }
}
