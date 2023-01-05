import { JSONParsable } from '../../_main/interfaces/json-parsable.interface';
import { User } from '../../auth/interfaces/user.interface';
import { unixTimestamp } from '../../_main/interfaces/date.interface';

/**
 * Interface to represent comment for task
 */
export interface Comment extends JSONParsable {
  /** Id of the comment */
  id: number;

  /** Content of the comment */
  content: string;

  /** User who created this comment */
  user: User;

  /** Date when comment was created */
  createdAt: unixTimestamp;
}
