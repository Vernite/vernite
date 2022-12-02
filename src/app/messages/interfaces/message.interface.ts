import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '../../_main/interfaces/json-parsable.interface';

export interface Message extends JSONParsable {
  id: string;
  user: string;
  channel: string;
  content: string;
  timestamp: unixTimestamp;
  provide: string;
}

export interface MessageContainer extends JSONParsable {
  cursor: string;
  messages: Message[];
}
