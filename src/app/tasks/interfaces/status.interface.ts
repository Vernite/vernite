import { color } from '../../_main/interfaces/color.interface';
import { Task } from './task.interface';

export interface Status {
  id: number;
  name: string;
  color: color;
  final: boolean;
}

export interface StatusWithTasks extends Status {
  tasks: Task[];
}
