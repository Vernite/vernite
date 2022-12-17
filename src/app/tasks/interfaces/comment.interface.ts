import { JSONParsable } from '../../_main/interfaces/json-parsable.interface';
import { User } from '../../auth/interfaces/user.interface';
import { unixTimestamp } from '../../_main/interfaces/date.interface';

export interface Comment extends JSONParsable {
  id: number;
  content: string;
  user: User;
  createdAt: unixTimestamp;
}
