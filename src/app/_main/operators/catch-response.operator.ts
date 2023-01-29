import { Observable } from 'rxjs';

/**
 * Catch response operator function - observe some observable and:
 * - catch response with given message
 * @param message message to catch
 * @param action action to perform
 * @deprecated use catchError instead
 */
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
