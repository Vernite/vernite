import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface FilterBase<T> {
  label: string;
  apply(list: any[], option: T | null | undefined): any[];
}

export interface FilterCheckbox<T = boolean> extends FilterBase<T> {
  type: 'checkbox';
  options: {
    1: T | null;
    0: T | null;
  };
  value: 1 | 0;
  apply(list: any[], option: T): any[];
}

export interface FilterText extends FilterBase<string> {
  type: 'text';
  value: string;
}

export interface FilterNumber extends FilterBase<number> {
  type: 'number';
  value: number;
}

export interface FilterSelect<T> extends FilterBase<T> {
  type: 'select',
  options: {
    label: string,
    value: T,
    icon?: IconDefinition | string,
  }[],
}

export type Filter = FilterCheckbox<any> | FilterText | FilterNumber | FilterSelect<any>;

export type FilterType = Filter['type'];
