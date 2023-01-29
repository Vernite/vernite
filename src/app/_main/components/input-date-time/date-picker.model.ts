/**
 * Calendar days grid interface
 */
export type DaysGrid = CalendarDay[][];

/**
 * Calendar day interface
 */
export interface CalendarDay {
  /** day id */
  id: number;
  /** day name */
  name: number;
  /** day is in weekend */
  isWeekend: boolean;
  /** day is in previous month */
  isFromPreviousMonth: boolean;
  /** day is in next month */
  isFromNextMonth: boolean;
  /** day is today */
  today: boolean;
  /** day is selected */
  selected: boolean;
}
