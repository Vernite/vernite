import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '@main/interfaces/json-parsable.interface';
import { Task } from './task.interface';

export interface Sprint extends JSONParsable {
  name: string;
  startDate: unixTimestamp;
  finishDate: unixTimestamp;
  status: string;
  description: string;
  tasks: Task[];
  id: number;
}
