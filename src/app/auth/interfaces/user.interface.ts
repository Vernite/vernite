import { JSONParsable } from '@main/interfaces/json-parsable.interface';

export interface User extends JSONParsable {
  id: number;
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  /** Not yet in API */
  dateFormat: string;
}

export interface UserWithPrivileges extends JSONParsable {
  user: User;
  privileges: number;
}

export interface ModifyUser extends JSONParsable {
  name?: string;
  surname?: string;
  avatar?: string;
}

export interface UserData extends JSONParsable {
  id: number;
  name: string;
  surname: string;
  username: string;
  avatar: string;
}
