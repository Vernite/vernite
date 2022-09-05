import dayjs from 'dayjs';

export type JSONPrimitive = string | number | boolean | undefined | null;

export interface JSONParsable {
  [key: string]: JSONPrimitive | JSONPrimitive[] | dayjs.Dayjs | JSONParsable | JSONParsable[];
}

export interface JSONParsed {
  [key: string]: JSONPrimitive | JSONPrimitive[] | JSONParsed | JSONParsed[];
}
