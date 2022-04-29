import { color } from '../../_main/interfaces/color.interface';
export interface Status {
  id: number;
  name: string;
  color: color;
  final: boolean;
}
