export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
}

export interface ModifyUser {
  name: string;
  surname: string;
  password: string;
  avatar: string;
}
