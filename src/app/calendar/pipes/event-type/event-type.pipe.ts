import { Pipe, PipeTransform } from '@angular/core';
import * as Color from 'color';
import { EventType } from '../../enums/event-type.enum';

/**
 * Event type pipe
 */
@Pipe({
  name: 'eventType',
})
export class EventTypePipe implements PipeTransform {
  /**
   * Get color of the event by type
   * @param value Event type
   * @param type type of value to return
   * @returns Color of event type
   */
  transform(value: EventType, type: 'color'): Color {
    switch (value) {
      // Meeting
      case EventType.MEETING:
        return {
          color: Color.rgb(52, 152, 219),
        }[type];

      // Sprint
      case EventType.SPRINT:
        return {
          color: Color.rgb(46, 204, 113),
        }[type];

      // Task deadline
      case EventType.TASK_DEADLINE:
        return {
          color: Color.rgb(231, 76, 60),
        }[type];

      // Task estimate
      case EventType.TASK_ESTIMATE:
        return {
          color: Color.rgb(155, 89, 182),
        }[type];

      // Unknown
      default:
        console.warn('Unknown event type:', value);
        return value;
    }
  }
}
