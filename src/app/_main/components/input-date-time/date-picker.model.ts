export type DaysGrid = CalendarDay[][];

export interface CalendarDay {
  id: number;
  name: number;
  isWeekend: boolean;
  isFromPreviousMonth: boolean;
  isFromNextMonth: boolean;
  today: boolean;
  selected: boolean;
}
