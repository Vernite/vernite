import { ApiFile } from '@main/interfaces/api-file.interface';

export function isApiFile(object: any): object is ApiFile {
  return object && object.uploaded && object.hash && object.contentType && object.url;
}
