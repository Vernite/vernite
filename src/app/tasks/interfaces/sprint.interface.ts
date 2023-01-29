import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '@main/interfaces/json-parsable.interface';
import { SprintStatus } from '@tasks/enums/sprint-status.enum';
import { Task } from './task.interface';

/** Interface to represent SCRUM Sprint */
export interface Sprint extends JSONParsable {
  /** Name of the sprint */
  name: string;

  /** Start date of the sprint */
  startDate: unixTimestamp;

  /** Finish date of the sprint */
  finishDate: unixTimestamp;

  /** Status of the sprint */
  status: SprintStatus;

  /** Description of the sprint */
  description: string;

  /** Tasks attached to this sprint */
  tasks: Task[];

  /** Id of the sprint */
  id: number;
}
