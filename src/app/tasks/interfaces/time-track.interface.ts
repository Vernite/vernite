import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '@main/interfaces/json-parsable.interface';

/** Tracked time entry interface (time spent on the task) */
export interface TimeTrack extends JSONParsable {
  /** Id of the time track entry */
  id?: number;

  /** Start of the time track entry */
  startDate: unixTimestamp;

  /** End of the time track entry */
  endDate?: unixTimestamp;

  /** information if user modified the time track entry */
  edited: boolean;

  /** Id of the project the time tract is connected to */
  projectId: number;

  /** Id of the task the time tract is connected to */
  taskId: number;

  /** Id of the user the time tract is connected to */
  userId: number;
}
