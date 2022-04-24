export interface ProjectMember {
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
