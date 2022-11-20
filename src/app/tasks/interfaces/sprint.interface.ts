import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '@main/interfaces/json-parsable.interface';
import { SprintStatus } from '@tasks/enums/sprint-status.enum';
import { Task } from './task.interface';

export interface Sprint extends JSONParsable {
  name: string;
  startDate: unixTimestamp;
  finishDate: unixTimestamp;
  status: SprintStatus;
  description: string;
  tasks: Task[];
  id: number;
}
