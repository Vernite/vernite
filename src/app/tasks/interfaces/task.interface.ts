import { GitIssue, GitPull } from '@dashboard/interfaces/git-integration.interface';
import { TaskType } from '@tasks/enums/task-type.enum';
import { JSONParsable } from './../../_main/interfaces/json-parsable.interface';
import { unixTimestamp } from '../../_main/interfaces/date.interface';

/**
 * Project task interface
 */
export interface Task extends JSONParsable {
  /**
   * Task id (unique per project)
   */
  id: number;

  /**
   * Task name
   */
  name: string;

  /**
   * Task description
   */
  description: string;

  /**
   * Task deadline to be completed
   */
  deadline: unixTimestamp;

  /**
   * Task estimated date to work on it
   */
  estimatedDate: unixTimestamp;

  /**
   * Project identifier
   */
  projectId: number;

  /**
   * Workspace identifier
   */
  workspaceId: number;

  /**
   * Status id (unique per database)
   */
  statusId?: number;

  /**
   * Parent task id
   */
  parentTaskId?: number;

  /**
   * List of subtasks
   */
  subTasks?: Task[];

  /**
   * Optional link to the GitHub issue
   */
  issue?: GitIssue;

  /**
   * Task type (ex. EPIC, USER_STORY)
   */
  type: TaskType;

  /**
   * Optional link to the GitHub pull request
   */
  pull?: GitPull;

  /**
   * Optional merged pull requests list
   */
  mergedPullList?: GitPull[];

  /**
   * Optional user id who is assigned to task
   */
  assigneeId?: number;
}
