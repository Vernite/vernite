import { DataFilter, DataFilterType } from '@main/interfaces/filters.interface';
import { TaskType } from '@tasks/enums/task-type.enum';
import { Task } from '@tasks/interfaces/task.interface';

/** Tasks filters class, used to filter results from API */
export class TaskFilters {
  /** Filter tasks by id of the sprint */
  public static SPRINT_ID(sprintId: number): DataFilter<Task, number> {
    return {
      identifier: 'SPRINT_ID',
      type: DataFilterType.BACKEND,
      field: 'sprintId',
      value: sprintId,
      apply(list) {
        return list.filter((task) => task.sprintId === sprintId);
      },
    };
  }

  /** Filter tasks by assignee id */
  public static ASSIGNEE_ID(
    assigneeId: number | null | 'all',
  ): DataFilter<Task, number | null | undefined> {
    return {
      identifier: 'ASSIGNEE_ID',
      type: DataFilterType.BACKEND,
      field: 'assigneeId',
      value: assigneeId === 'all' ? undefined : assigneeId,
      apply(list) {
        return list.filter((task) => task.assigneeId === assigneeId);
      },
    };
  }

  /** Filter tasks by id of the status */
  public static STATUS_IDS(
    statusIds: number[] | 'all' | null,
  ): DataFilter<Task, number[] | undefined> {
    return {
      identifier: 'STATUS_IDS',
      type: DataFilterType.BACKEND,
      field: 'statusId',
      value: ['all', null].includes(statusIds as any) ? undefined : (statusIds as number[]),
      apply(list) {
        if (Array.isArray(statusIds)) {
          return list.filter((task) => statusIds.includes(task.statusId));
        }
        return list;
      },
    };
  }

  /** Filter tasks by type */
  public static TYPES(types: TaskType[]): DataFilter<Task, TaskType[]> {
    return {
      identifier: 'TYPES',
      type: DataFilterType.BACKEND,
      field: 'type',
      value: types,
      apply(list) {
        return list.filter((task) => types.includes(task.type));
      },
    };
  }

  /** Filter tasks by parent task id */
  public static PARENT_TASK_ID(parentTaskId: number): DataFilter<Task, number> {
    return {
      identifier: 'PARENT_TASK_ID',
      type: DataFilterType.BACKEND,
      field: 'parentTaskId',
      value: parentTaskId,
      apply(list) {
        return list.filter((task) => task.parentTaskId === parentTaskId);
      },
    };
  }

  /** Filter tasks by backlog */
  public static BACKLOG(): DataFilter<Task, boolean> {
    return {
      identifier: 'BACKLOG',
      type: DataFilterType.BACKEND,
      field: 'backlog',
      value: true,
      apply(list) {
        // TODO: Implement
        return list;
      },
    };
  }
}
