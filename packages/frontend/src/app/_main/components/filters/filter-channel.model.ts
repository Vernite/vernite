import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { DataFilter } from '@main/interfaces/filters.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { TaskFilters } from '@tasks/filters/task.filters';

/**
 * Filter channels
 */
export const FilterChannel = {
  TASKS: createChannel<Task>('filter-tasks', TaskFilters, []),
};

/**
 * Create filter channel
 * @param name name of the channel
 * @param filtersClass class with filters
 * @param defaultValue default value
 * @returns filter channel
 */
function createChannel<T>(
  name: string,
  filtersClass: any,
  defaultValue: DataFilter<T, any>[],
): BehaviorSubject<DataFilter<any, any>[]> {
  const subject = new BehaviorSubject<any>(defaultValue);
  const obs = new Observable(function (observer: Observer<any>) {
    const channel = new BroadcastChannel(name);

    Reflect.defineProperty(subject, 'channel', {
      value: channel,
    });

    channel.onmessage = (event: MessageEvent<any>) => {
      observer.next(
        event.data.map(({ identifier, value }: any) => {
          return filtersClass[identifier](value) as DataFilter<any, any>;
        }),
      );
    };

    return () => {
      console.log('closing broadcast channel');
      // TODO: Check if this is needed or check how channel should be closed when not used
      // channel.close();
    };
  });

  obs.subscribe(subject);

  return subject as BehaviorSubject<DataFilter<T, any>[]>;
}
