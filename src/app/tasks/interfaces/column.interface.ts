export interface Column<T> {
  id: number;
  name: string;
  tasks: T[];
}
