import { ProjectMember } from './project-member.interface';
import { JSONParsable } from './../../_main/interfaces/json-parsable.interface';
import { ApiFile } from '@main/interfaces/api-file.interface';
import { Status } from '../../tasks/interfaces/status.interface';

export interface Project extends JSONParsable {
  /**
   * The project's ID.
   */
  id: number;

  /**
   * The project's name.
   */
  name: string;

  /**
   * The project's description.
   */
  description: string;

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

  /**
   * Logo file metadata
   */
  logo?: ApiFile;

  statuses: Status[];
}
