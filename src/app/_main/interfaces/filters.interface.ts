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

// New filters system
export enum DataFilterType {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
}

export enum DataFilterControlType {
  CHECKBOX = 'checkbox',
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
  DATE = 'date',
}

export interface DataFilter<T, V = any> {
  identifier: string;
  type: DataFilterType;
  field: string;
  value: V;
  apply(list: T[]): T[];
}

export interface DataFilterWithView<T, V> extends DataFilter<T, V> {
  view(...args: any): {
    component: any;
  };
}

export interface DataFilterDisplay<T, V> {
  type: DataFilterControlType;
  label: string;
  dataFilter: DataFilter<T, V>;
}

export interface DataFilterCheckbox<T> extends DataFilterDisplay<T, boolean> {
  type: DataFilterControlType.CHECKBOX;
}
