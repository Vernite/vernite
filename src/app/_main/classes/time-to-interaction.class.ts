import { BehaviorSubject, of, merge, take, interval, map, tap, skip } from 'rxjs';

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
