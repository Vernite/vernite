import { JSONParsable } from '@main/interfaces/json-parsable.interface';
import { concat, Observable, of, tap } from 'rxjs';
import { Store } from '../store.class';

/**
 * Use store operator function to save result in store
 * @param store store to use
 * @param path path to save result
 * @returns observable
 */
export function useStore(store: Store, path: (string | number)[]) {
  return <T extends JSONParsable = any>(source: Observable<T>) => {
    const storedValue = store.get(path) as T;

    return concat(
      ...[storedValue ? of(storedValue) : []],
      source.pipe(
        tap((value) => {
          store.set(path, value);
        }),
      ),
    );
  };
}
