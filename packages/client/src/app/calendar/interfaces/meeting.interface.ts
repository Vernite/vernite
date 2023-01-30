import { User } from '@auth/interfaces/user.interface';
import { Project } from '@dashboard/interfaces/project.interface';
import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '@main/interfaces/json-parsable.interface';

/** Interface to represent meeting */
export interface Meeting extends JSONParsable {
  /** Id of the meeting */
  id: number;

  /** Name of the meeting */
  name: string;

  /** Description of the meeting */
  description?: string;

  /** Location of the meeting */
  location?: string;

  /** Start date of the meeting */
  startDate: unixTimestamp;

  /** End date of the meeting */
  endDate: unixTimestamp;

  /** Project of the meeting */
  project?: Project;

  /** List of participants */
  participants?: User[];

  /** List of participants ids (used only when creating new meeting) */
  participantIds?: number[];
}
