import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

// TODO: Rework filters interfaces

export interface FilterBase {
  label: string;
  value: any;
  apply(list: any[]): any[];
}

export interface FilterCheckbox<T = boolean> extends FilterBase {
  type: 'checkbox';
  options: {
    1: T | null;
    0: T | null;
  };
  value: 1 | 0;
  apply(list: any[]): any[];
}

export interface FilterText extends FilterBase {
  type: 'text';
  value: string;
}

export interface FilterNumber extends FilterBase {
  type: 'number';
  value: number;
}

export interface FilterSelect<T> extends FilterBase {
  type: 'select';
  options: {
    label: string;
    value: T;
    icon?: IconDefinition | string;
  }[];
  value: T | null;
}

export type Filter = FilterCheckbox<any> | FilterText | FilterNumber | FilterSelect<any>;

export type FilterType = Filter['type'];
