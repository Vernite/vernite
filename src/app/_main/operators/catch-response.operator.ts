import { Observable } from 'rxjs';

/** @deprecated */
export function catchResponse(message: string, action: (res?: any) => void) {
  return <T = any>(source: Observable<T>) => {
    const match = (response: any) => {
      return response?.error?.message === message || response?.message === message;
    };

    return new Observable<any>((subscriber) => {
      source.subscribe({
        next(value) {
          if (match(value)) {
            action(value);
          } else {
            subscriber.next(value);
          }
        },
        error(error) {
          if (match(error)) {
            action(error);
          } else {
            subscriber.error(error);
          }
        },
        complete() {
          subscriber.complete();
        },
      });
    });
  };
}
