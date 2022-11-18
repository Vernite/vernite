import { User } from '@auth/interfaces/user.interface';
import { Project } from '@dashboard/interfaces/project.interface';
import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '@main/interfaces/json-parsable.interface';

export interface Meeting extends JSONParsable {
  id: number;
  name: string;
  description?: string;
  location?: string;
  startDate: unixTimestamp;
  endDate: unixTimestamp;
  project?: Project;
  participants?: User[];
  participantIds?: number[];
}
