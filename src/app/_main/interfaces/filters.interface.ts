export interface FilterCheckbox<T = boolean> {
  type: 'checkbox';
  options: {
    1: T | null;
    0: T | null;
  };
  value: 1 | 0;
  label: string;
  apply(input: T, option: any): T;
}

export type Filter = FilterCheckbox<any>;

export type FilterType = 'checkbox';
