import { shareReplay, from } from 'rxjs';

/**
 * Options to modify caching behavior
 */
export interface CacheOptions {
  interval: number;
}

/**
 * Default options to modify caching behavior
 */
export const DefaultCacheOptions = {
  interval: 1000 * 5,
};

/**
 * Decorator to cache API responses as observables.
 */
export function Cache(options?: CacheOptions): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    options = { ...DefaultCacheOptions, ...options };

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const cacheKey = `__${String(propertyKey)}_${JSON.stringify(args)}`;
      const cache = target[cacheKey];

      if (cache) {
        // console.log('cache hit', target.constructor.name, cacheKey);
        return from(cache);
      }

      const result = originalMethod.apply(this, args).pipe(shareReplay(1));
      target[cacheKey] = result;

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
