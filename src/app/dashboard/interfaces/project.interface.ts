import { ProjectMember } from './project-member.interface';

export interface Project {
  /**
   * The project's ID.
   */
  id: number;

  /**
   * The project's name.
   */
  name: string;

  /**
   * GitHub repository name
   * @example
   * "SamPanDonte/untitled"
   */
  gitHubIntegration: string;

  /**
   * List of projects members
   */
  projectMembers?: ProjectMember[];
}
