import { Project } from '@dashboard/interfaces/project.interface';
import { unixTimestamp } from '@main/interfaces/date.interface';
import { JSONParsable } from '@main/interfaces/json-parsable.interface';
import { Task } from '@tasks/interfaces/task.interface';

export interface Release extends JSONParsable {
  id: number;
  name: string;
  description: string;
  deadline: unixTimestamp;
  released: boolean;
  tasks: Task[];
  project: Project;
}
