import { GitIssue, GitPull } from '@dashboard/interfaces/git-integration.interface';

/**
 * Project task interface
 */
export interface Task {
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
  deadline: Date;

  /**
   * Task estimated date to work on it
   */
  estimatedDate: Date;

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
  issue?: string;

  /**
   * Task type (ex. EPIC, USER_STORY)
   */
  type: string;

  /**
   * Optional link to the GitHub pull request
   */
  pull?: string;

  /**
   * Optional merged pull requests list
   */
  mergedPullList?: String[];

  /**
   * Optional user id who is assigned to task
   */
  assigneeId?: number;
}

/**
 * Extended project task interface
 */
export interface TaskWithAdditionalData extends Omit<Task, 'pull' | 'issue'> {
  /**
   * Project identifier
   */
  projectId: number;

  /**
   * Workspace identifier
   */
  workspaceId: string;

  /**
   * Boolean to determine if task is connected to GitHub issue
   */
  connectWithIssueOnGitHub: boolean;

  /**
   * Boolean to determine if task should be attached to existing GitHub issue instead of creating new one
   */
  issueAttachGithub: boolean;

  /**
   * Boolean to determine if task is connected to GitHub pull request
   */
  connectWithPullRequestOnGitHub: boolean;

  /**
   * GitHub pull to which the task is connected to
   */
  pull: GitPull;

  /**
   * GitHub issue to which the task is connected to
   */
  issue: GitIssue;
}
