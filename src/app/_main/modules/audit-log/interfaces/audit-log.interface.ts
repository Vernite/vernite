import { unixTimestamp } from '../../../interfaces/date.interface';
import { UserData } from '../../../../auth/interfaces/user.interface';

/**
 * Changes history of an entity
 */
export interface AuditLog<T> {
  /**
   * Date of the change
   */
  date: unixTimestamp;

  /**
   * User who made the change
   */
  user: UserData;

  /**
   * Project ID
   */
  projectId: number;

  /**
   * Type of the change
   */
  type: 'task';

  /**
   * Old value of the change
   */
  oldValues?: Partial<T>;

  /**
   * New value of the change
   */
  newValues?: Partial<T>;

  /**
   * Not changed values
   */
  sameValues?: Partial<T>;
}

export interface ChangeLog {
  /**
   * User Marcin Czerniak created task #1 - "Task 1"
   * User Marcin Czerniak deleted task #1 - "Task 1"
   * User Marcin Czerniak updated task #1 - "Task 1"
   * - added deadline 2020-12-12
   * - changed name from "Task 1" to "Task 2"
   */
  taskType: string;

  action: string;

  actionCode: 'CREATED' | 'UPDATED' | 'DELETED';

  userLabel: string;

  taskLabel: string;

  projectId: number;

  taskId: number;

  changes?: {
    label: string;
    oldValue: string;
    newValue: string;
  }[];
}
