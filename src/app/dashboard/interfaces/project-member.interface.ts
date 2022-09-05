import { JSONParsable } from './../../_main/interfaces/json-parsable.interface';

/**
 * Project member interface. Process member is a user who has access to the project.
 */
export interface ProjectMember extends JSONParsable {
  user: {
    id: number;
    name: string;
    surname: string;
    email: string;
    avatar: string;
    username: string;
  };
  privileges: number;
}
