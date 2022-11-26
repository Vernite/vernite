import { DataFilter, DataFilterType } from '@main/interfaces/filters.interface';
import { SprintStatus } from '@tasks/enums/sprint-status.enum';
import { Sprint } from '@tasks/interfaces/sprint.interface';

export class SprintFilters {
  public static STATUS(sprintStatus: SprintStatus): DataFilter<Sprint, SprintStatus> {
    return {
      type: DataFilterType.BACKEND,
      field: 'status',
      value: sprintStatus,
      apply(list: Sprint[]) {
        return list.filter((sprint) => sprint.status === sprintStatus);
      },
    };
  }
}
