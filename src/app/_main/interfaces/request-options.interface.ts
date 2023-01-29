import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataFilter } from './filters.interface';
import { JSONParsable, JSONPrimitive } from './json-parsable.interface';

/**
 * Request options interface
 * Use this interface to configure request options like body, params, headers, etc.
 */
export interface RequestOptions {
  /**
   * Body to send with the request. Used int POST, PATH, PATCH, DELETE requests.
   */
  body?: JSONParsable | JSONPrimitive | JSONPrimitive[] | FormData;
  /**
   * Headers to send with the request.
   */
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  /**
   * Additional context to attach with request.
   */
  context?: HttpContext;
  /**
   * Part of the response to observe.
   */
  observe?: 'body';
  /**
   * Query params to send with the request.
   */
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
  /**
   * Used to report progress events like download or upload progress.
   */
  reportProgress?: boolean;

  /**
   * Response type to expect from the server.
   * For example:
   * - blob - will return a Blob object (used when API sends back a file).
   * - json - will return a JSON object.
   * - text - will return a string.
   *
   * Default is json.
   */
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  /**
   * If you want the credentials (cookie authentication token) to be passable through a call,
   * you need to add `{ withCredentials: true }` in your httpClient call.
   */
  withCredentials?: boolean;

  filters?: DataFilter<any, any>[] | DataFilter<any, any>;
}
