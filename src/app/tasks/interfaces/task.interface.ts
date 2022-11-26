import { GitIssue, GitPull } from '@dashboard/interfaces/git-integration.interface';
import { TaskType } from '@tasks/enums/task-type.enum';
import { JSONParsable } from './../../_main/interfaces/json-parsable.interface';
import { unixTimestamp } from '../../_main/interfaces/date.interface';
import { TimeTrack } from './time-track.interface';
import { TaskPriority } from '@tasks/enums/task-priority.enum';

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
   * Status id
   */
  statusId: number;

  /**
   * The id of the user who created the task
   */
  createdBy?: number;

  /**
   * Date of creation
   */
  createdAt?: unixTimestamp;

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
  assigneeId?: number | null;

  /**
   * List of trackers for this task
   */
  timeTracks: TimeTrack[];

  /**
   * Id of assigned sprint
   */
  sprintId?: number;

  /**
   * Task priority
   * @default TaskPriority.MEDIUM
   * @see TaskPriority
   */
  priority: TaskPriority;

  /**
   * Epic attached to task
   */
  epic: Task | null;

  /**
   * Points to measure task complexity
   */
  storyPoints: number;
}
