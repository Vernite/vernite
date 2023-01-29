import { JSONParsable } from './json-parsable.interface';

/** Report bug interface */
export interface ReportBug extends JSONParsable {
  title: string;
  description: string;
}
