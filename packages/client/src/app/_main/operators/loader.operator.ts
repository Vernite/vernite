import { Loader } from '@main/classes/loader/loader.class';
import { finalize, Observable, of, switchMap, tap } from 'rxjs';

/**
 * Start loader operator function
 * @param loader loader to start
 * @param message message to display
 * @returns observable
 */
export function startLoader(loader: Loader, message?: string) {
  return <T = any>(source: Observable<T>) => {
    return source.pipe(
      tap(() => {
        loader.message = message;
        loader.markAsPending();
      }),
    );
  };
}

/**
 * Set loader message operator function
 * @param loader loader to change message
 * @param message message to display
 * @returns observable
 */
export function setLoaderMessage(loader: Loader, message?: string) {
  return <T = any>(source: Observable<T>) => {
    return source.pipe(
      tap(() => {
        loader.message = message;
      }),
    );
  };
}

/**
 * Stop loader operator function
 * @param loader loader to stop
 * @returns observable
 */
export function stopLoader(loader: Loader) {
  return <T = any>(source: Observable<T>) => {
    return source.pipe(
      finalize(() => {
        loader.markAsDone();
      }),
      tap(() => {
        loader.markAsDone();
      }),
    );
  };
}

/**
 * With loader operator function - observe some observable and:
 * - start loader after beginning
 * - stop loader after ending
 * @param loader loader to operate on
 * @returns observable
 */
export function withLoader(loader: Loader) {
  return <T = any>(source: Observable<T>) => {
    return of(null).pipe(
      startLoader(loader),
      switchMap(() => source),
      stopLoader(loader),
    );
  };
}
