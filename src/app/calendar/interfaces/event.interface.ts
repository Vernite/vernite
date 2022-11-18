import { unixTimestamp } from '@main/interfaces/date.interface';
import { EventType } from '../enums/event-type.enum';

export interface Event {
  projectId: number;
  type: EventType;
  relatedId: number;
  name: string;
  description: string;
  startDate: unixTimestamp;
  endDate: unixTimestamp;
  location: string;
}
