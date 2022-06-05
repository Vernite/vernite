import { UserData } from '@auth/interfaces/user.interface';

export type Schedule = SinglePersonSchedule[];

export interface SinglePersonSchedule {
  user: UserData;
  tasks: Map<number | null, Task>;
}
