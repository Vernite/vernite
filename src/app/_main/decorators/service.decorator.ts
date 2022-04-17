import { environment } from 'src/environments/environment';

/**
 * Decorator to mark class as a service and store theirs instances in global variable.
 */
export function Service() {
  return function decorator(target: any) {
    if (environment.production) return;

    setTimeout(() => {
      const WINDOW = window as any;
      const ngRef = WINDOW.ngRef;

      if (!ngRef) return;

      if (!WINDOW.SERVICES) {
        WINDOW.SERVICES = [];
      }

      WINDOW.SERVICES.push(ngRef.get(target));
    });
  };
}
