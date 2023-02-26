import { Project } from './project.interface';
import { JSONParsable } from './../../_main/interfaces/json-parsable.interface';

/**
 * Main workspace (projects/spaces grouping entity) interface
 */
export interface Workspace extends JSONParsable {
  /**
   * Workspace ID
   */
  id: number;
  /**
   * Workspace name
   */
  name: string;
  /**
   * Workspace projects
   */
  projects: Project[];
}
