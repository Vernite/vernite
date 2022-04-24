import { ProjectMember } from './project-member.interface';

export interface Project {
  id: number;
  name: string;
  projectMembers: ProjectMember[];
}
