import { JSONParsable } from '@main/interfaces/json-parsable.interface';
import { unixTimestamp } from '../../_main/interfaces/date.interface';

/**
 * Basic user interface.
 */
export interface User extends JSONParsable {
  /**
   * User ID.
   */
  id: number;

  /**
   * User name (first name).
   */
  name: string;

  /**
   * User surname (last name).
   */
  surname: string;

  /**
   * User email address.
   */
  email: string;

  /**
   * User username.
   */
  username: string;

  /**
   * User password. Used in registration. Not returned by API.
   */
  password?: string;

  /**
   * User avatar URL. Note: This feature is not implemented yet.
   */
  avatar: string;

  /**
   * Date format used by user.
   */
  dateFormat: string;

  /**
   * User language.
   */
  language: string;

  /**
   * Time format used by user.
   * @Note This feature is not implemented in API yet.
   */
  timeFormat: string;

  /**
   * User first day of week.
   * @Note This feature is not implemented in API yet.
   */
  firstDayOfWeek: number;

  /**
   * Date of user deletion. If user is deleted, this field is set to date of deletion.
   */
  deleted?: unixTimestamp;

  /**
   * Indication if user is permanently deleted (could not be reverted).
   */
  deletedPermanently: boolean;
}

/**
 * Part of the user interface returned by the API in special situations.
 */
export type UserData = Pick<User, 'id' | 'name' | 'surname' | 'email' | 'username' | 'avatar'>;
