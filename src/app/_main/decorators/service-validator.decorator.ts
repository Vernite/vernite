import { DialogService } from '@main/services/dialog/dialog.service';
import { Observable } from 'rxjs';

export interface ErrorValidationTree {
  [key: string]: {
    [key: number]: string;
  };
}

/**
 * @TODO: Replace this function with some kind of operator function in requests
 */
export function ServiceValidator(errorValidationTree: ErrorValidationTree) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = function (identifier: string) {
      // const result = originalMethod.apply(this, identifier);

      // This function returns new observable to use it as a pipe in other observables
      return <T = any>(source: Observable<T>) => {
        // Check for match in response
        const match = (response: any) => {
          // identifier check
          if (!errorValidationTree[identifier]) return;

          // Status check
          const status = response?.error?.status || response?.status;
          if (!status) return;

          return errorValidationTree[identifier][status] || null;
        };

        const showAlert = (message: string, responseType: 'SUCCESS' | 'ERROR') => {
          const dialogService = (window as any).injector.get(DialogService);

          dialogService.alert({
            title:
              responseType === 'SUCCESS' ? $localize`Success` : $localize`Something went wrong`,
            message,
            cancelText: $localize`OK`,
          });
        };

        return new Observable<any>((subscriber) => {
          source.subscribe({
            next(value) {
              const m = match(value);

              if (m) {
                showAlert(m, 'ERROR');
              } else {
                subscriber.next(value);
              }
            },
            error(error) {
              const m = match(error);

              if (m) {
                showAlert(m, 'ERROR');
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
    };

    return descriptor;
  };
}
