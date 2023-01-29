import { JSONParsable } from './../../_main/interfaces/json-parsable.interface';
import { UserData } from '@auth/interfaces/user.interface';

/**
 * Project member interface. Process member is a user who has access to the project.
 */
export interface ProjectMember extends JSONParsable {
  /** Project member */
  user: UserData;

  /** Privileges to project */
  privileges: number;
}
