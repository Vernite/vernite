import { DataFilter, DataFilterType } from '@main/interfaces/filters.interface';
import { TaskType } from '@tasks/enums/task-type.enum';
import { Task } from '@tasks/interfaces/task.interface';

export class TaskFilters {
  public static SPRINT_ID(sprintId: number): DataFilter<Task, number> {
    return {
      type: DataFilterType.BACKEND,
      field: 'sprintId',
      value: sprintId,
    };
  }

  public static ASSIGNEE_ID(assigneeId: number): DataFilter<Task, number> {
    return {
      type: DataFilterType.BACKEND,
      field: 'assigneeId',
      value: assigneeId,
    };
  }

  public static STATUS_IDS(statusIds: number[]): DataFilter<Task, number[]> {
    return {
      type: DataFilterType.BACKEND,
      field: 'statusId',
      value: statusIds,
    };
  }

  public static TYPES(types: TaskType[]): DataFilter<Task, TaskType[]> {
    return {
      type: DataFilterType.BACKEND,
      field: 'type',
      value: types,
    };
  }

  public static PARENT_TASK_ID(parentTaskId: number): DataFilter<Task, number> {
    return {
      type: DataFilterType.BACKEND,
      field: 'parentTaskId',
      value: parentTaskId,
    };
  }

  public static BACKLOG(): DataFilter<Task, boolean> {
    return {
      type: DataFilterType.BACKEND,
      field: 'backlog',
      value: true,
    };
  }
}
