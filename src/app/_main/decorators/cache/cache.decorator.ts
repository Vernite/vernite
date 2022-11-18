import { Observable, shareReplay } from 'rxjs';

export interface CacheOptions {
  interval: number;
}

/**
 * Decorator to cache API responses as observables.
 */
export function Cache(options?: CacheOptions): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const cacheKey = `__${String(propertyKey)}_${JSON.stringify(args)}`;
      const cache = target[cacheKey];

      if (cache) {
        return cache;
      }

      const result = originalMethod.apply(this, args) as Observable<any>;
      target[cacheKey] = result.pipe(shareReplay(1));

      if (options && options.interval) {
        setTimeout(() => {
          delete target[cacheKey];
        }, options.interval);
      }

      return result;
    };

    return descriptor;
  };
}
