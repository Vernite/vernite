import { Filter } from '@main/interfaces/filters.interface';
import { map, Observable } from 'rxjs';

export function applyFilters(filters?: Filter[]) {
  return <T = any>(source: Observable<T>) => {
    return source.pipe(
      map((input: any) => {
        if (!filters) return input;
        return filters.reduce((acc, filter) => {
          return filter.apply(acc, filter.options[filter.value]);
        }, input);
      }),
    );
  };
}
