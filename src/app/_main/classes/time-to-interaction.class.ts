import { BehaviorSubject, of, merge, take, interval, map, tap, skip } from 'rxjs';

/**
 * Create a time to interaction observable
 * @param time time to wait before emitting true
 * @returns time to interaction observable
 */
export function timeToInteraction(time: number = 100) {
  const subject = new BehaviorSubject<boolean>(false);

  const _merge = merge(
    of(false),
    interval(time).pipe(
      take(1),
      map(() => true),
    ),
  )
    .pipe(
      tap((val) => subject.next(val)),
      skip(1),
      tap(() => {
        _merge.unsubscribe();
        subject.complete();
      }),
    )
    .subscribe();

  return subject;
}
