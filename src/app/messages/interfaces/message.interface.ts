import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '../../_main/interfaces/json-parsable.interface';

/** Interface to represent chat message */
export interface Message extends JSONParsable {
  /** Id of the message */
  id: string;

  /** User who sent the message */
  user: string;

  /** Channel the message was sent to */
  channel: string;

  /** Content of the message */
  content: string;

  /** Date when message was sent */
  timestamp: unixTimestamp;

  /** Provider of the message */
  provide: string;
}

/** Interface to represent chat message container */
export interface MessageContainer extends JSONParsable {
  /** Cursor to get next messages */
  cursor: string;

  /** Messages in the container */
  messages: Message[];
}
