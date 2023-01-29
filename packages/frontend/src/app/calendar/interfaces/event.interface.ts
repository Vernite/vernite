import { unixTimestamp } from '@main/interfaces/date.interface';
import { EventType } from '../enums/event-type.enum';

/** Interface to represent calendar event */
export interface Event {
  /** Id of the event */
  id: number;

  /** Project of the event */
  projectId: number;

  /** Type of the event */
  type: EventType;

  /** Id of the related object */
  relatedId: number;

  /** Name of the event */
  name: string;

  /** Description of the event */
  description: string;

  /** Start date of the event */
  startDate: unixTimestamp;

  /** End date of the event */
  endDate: unixTimestamp;

  /** Location of the event */
  location: string;
}
