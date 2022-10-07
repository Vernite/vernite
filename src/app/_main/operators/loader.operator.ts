import { Loader } from '@main/classes/loader/loader.class';
import { Observable, tap } from 'rxjs';

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
      tap(() => {
        loader.markAsDone();
      }),
    );
  };
}
