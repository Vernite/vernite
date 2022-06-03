import { User } from '@auth/interfaces/user.interface';

export type Schedule = SinglePersonSchedule[];

export interface SinglePersonSchedule {
  user: User;
  tasks: Map<number | null, Task>;
}
