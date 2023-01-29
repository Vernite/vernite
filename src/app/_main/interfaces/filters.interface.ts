/**
 * Data filter type
 */
export enum DataFilterType {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
}

/**
 * Data filter control type
 */
export enum DataFilterControlType {
  CHECKBOX = 'checkbox',
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
  DATE = 'date',
}

/**
 * Data filter interface
 */
export interface DataFilter<T, V = any> {
  /** Filter identifier */
  identifier: string;
  /** Filter type */
  type: DataFilterType;
  /** Filter field */
  field: string;
  /** Filter value */
  value: V;
  /** Filter apply function */
  apply(list: T[]): T[];
}

/**
 * Data filter with view interface
 * Probably not needed (Draft)
 */
export interface DataFilterWithView<T, V> extends DataFilter<T, V> {
  /** Filter view */
  view(...args: any): {
    component: any;
  };
}

/**
 * Data filter display interface
 */
export interface DataFilterDisplay<T, V> {
  /** User control type */
  type: DataFilterControlType;
  /** User control label */
  label: string;
  /** User control data filter */
  dataFilter: DataFilter<T, V>;
}

/**
 * Data filter checkbox interface
 */
export interface DataFilterCheckbox<T> extends DataFilterDisplay<T, boolean> {
  type: DataFilterControlType.CHECKBOX;
}
