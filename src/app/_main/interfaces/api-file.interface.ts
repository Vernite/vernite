import { JSONParsable } from '@main/interfaces/json-parsable.interface';
import { unixTimestamp } from './date.interface';

export interface ApiFile extends JSONParsable {
  /**
   * Date of upload
   */
  uploaded: unixTimestamp;

  /**
   * File hash
   */
  hash: string;

  /**
   * Content type of the file
   */
  contentType: string;

  /**
   * File url - starts with /api/mdn/...
   */
  url: string;
}
