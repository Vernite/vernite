import { ApiFile } from '@main/interfaces/api-file.interface';

/** Test if object is an `ApiFile` object */
export function isApiFile(object: any): object is ApiFile {
  return object && object.uploaded && object.hash && object.contentType && object.url;
}
