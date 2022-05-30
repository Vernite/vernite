import { color } from '../../_main/interfaces/color.interface';
import { Task } from './task.interface';

/**
 * Task status/column interface
 */
export interface Status {
  /**
   * Status id (unique per database)
   */
  id: number;

  /**
   * Status name (Header displayed in labels or on the top of the columns)
   */
  name: string;

  /**
   * Status color (used to display as the background of the labels)
   */
  color: color;

  /**
   * Status final (used to determine if the task is done or not)
   */
  final: boolean;

  /**
   * Status begin (used to determine if the task is in progress or not). If begin is true,
   * the work on the task does not started yet.
   */
  begin: boolean;
}

/**
 * Status with task interface - status column with tasks
 */
export interface StatusWithTasks extends Status {
  tasks: Task[];
}
