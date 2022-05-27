export interface Task {
  id: number;
  name: string;
  description: string;
  deadline: Date;
  estimatedDate: Date;
  statusId?: number;
  parentTaskId?: number;
  subTasks?: Task[];

  /**
   * Optional link to the GitHub issue
   */
  issue?: string;
}
