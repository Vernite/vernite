import dayjs from 'dayjs';

/** Primitive value type, that can be parsed to JSON */
export type JSONPrimitive = string | number | boolean | undefined | null;

/** Type that can be parsed to JSON */
export interface JSONParsable {
  [key: string]: JSONPrimitive | JSONPrimitive[] | dayjs.Dayjs | JSONParsable | JSONParsable[];
}
