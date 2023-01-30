import { ServiceMethodOptions } from '@main/services/base/service-method-options.interface';
import { Observable } from 'rxjs';
import { withLoader } from './loader.operator';

/**
 * Apply options operator function
 */
export function applyOptions(options?: ServiceMethodOptions) {
  return <T = any>(source: Observable<T>) => {
    if (!options) return source;

    if (options.loader) {
      return source.pipe(withLoader(options.loader));
    } else {
      return source;
    }
  };
}
