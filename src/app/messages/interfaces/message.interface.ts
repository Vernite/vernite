import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '../../_main/interfaces/json-parsable.interface';

export interface Message extends JSONParsable {
  content: string;
  createdAt: unixTimestamp;
}
