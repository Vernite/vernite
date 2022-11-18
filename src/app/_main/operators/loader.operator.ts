import { Loader } from '@main/classes/loader/loader.class';
import { finalize, Observable, of, switchMap, tap } from 'rxjs';

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

export function setLoaderMessage(loader: Loader, message?: string) {
  return <T = any>(source: Observable<T>) => {
    return source.pipe(
      tap(() => {
        loader.message = message;
      }),
    );
  };
}

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

export function withLoader(loader: Loader) {
  return <T = any>(source: Observable<T>) => {
    return of(null).pipe(
      startLoader(loader),
      switchMap(() => source),
      stopLoader(loader),
    );
  };
}
