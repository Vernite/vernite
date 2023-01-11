import { Project } from '@dashboard/interfaces/project.interface';
import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '@main/interfaces/json-parsable.interface';
import { Task } from '@tasks/interfaces/task.interface';

/** Interface to represent project release */
export interface Release extends JSONParsable {
  /** Id of the release */
  id: number;

  /** Name of the release */
  name: string;

  /** Description of the release */
  description: string;

  /** Deadline of the release */
  deadline: unixTimestamp;

  /** State if release was finally released */
  released: boolean;

  /** Tasks attached to this release */
  tasks: Task[];
}
