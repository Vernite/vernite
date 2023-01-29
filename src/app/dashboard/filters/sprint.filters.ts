import { DataFilter, DataFilterType } from '@main/interfaces/filters.interface';
import { SprintStatus } from '@tasks/enums/sprint-status.enum';
import { Sprint } from '@tasks/interfaces/sprint.interface';

/**
 * Sprint filters class
 */
export class SprintFilters {
  /**
   * Filter to get sprints by status
   * @param sprintStatus Sprint status
   * @returns List of sprints with given status
   */
  public static STATUS(sprintStatus: SprintStatus): DataFilter<Sprint, SprintStatus> {
    return {
      identifier: 'STATUS',
      type: DataFilterType.BACKEND,
      field: 'status',
      value: sprintStatus,
      apply(list: Sprint[]) {
        return list.filter((sprint) => sprint.status === sprintStatus);
      },
    };
  }
}
