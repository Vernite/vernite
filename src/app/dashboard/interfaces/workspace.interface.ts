import { Project } from './project.interface';
/**
 * Main workspace (projects/spaces grouping entity) interface
 */
export interface Workspace {
  /**
   * Workspace ID
   */
  id: number;
  /**
   * Workspace name
   */
  name: string;

  projectsWithPrivileges: {
    project: Project;
    privileges: number;
  }[];
}
