import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '@main/interfaces/json-parsable.interface';

export interface TimeTrack extends JSONParsable {
  userId: number;
  timeStart: unixTimestamp;
  timeEnd: unixTimestamp;
  edited: boolean;
  enabled: boolean;
  projectId: number;
  taskId: number;
}
