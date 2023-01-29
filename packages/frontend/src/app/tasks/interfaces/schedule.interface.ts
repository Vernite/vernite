import { UserData } from '@auth/interfaces/user.interface';
import { unixTimestamp } from '@main/interfaces/date.interface';

/** List of schedules (users with tasks map) */
export type Schedule = SinglePersonSchedule[];

/** User with list of tasks mapped by dates */
export interface SinglePersonSchedule {
  /** User data */
  user: UserData;

  /** List of tasks mapped by dates */
  tasks: Map<unixTimestamp | null, Task>;
}
