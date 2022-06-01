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
   * Optional link to the GitHub pull request
   */
  pull?: string;
}
