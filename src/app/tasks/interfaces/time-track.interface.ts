import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '@main/interfaces/json-parsable.interface';

export interface TimeTrack extends JSONParsable {
  id?: number;
  startDate: unixTimestamp;
  endDate?: unixTimestamp;
  edited: boolean;
  projectId: number;
  taskId: number;
  userId: number;
}
