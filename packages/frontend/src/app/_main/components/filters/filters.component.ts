import { Component, Input } from '@angular/core';
import { DataFilter } from '@main/interfaces/filters.interface';
import { BehaviorSubject } from 'rxjs';
import { FilterControls } from './filter-entry.type';

/**
 * Filters component
 */
@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  /**
   * Filters group
   */
  @Input() filtersGroup!: FilterControls;

  /**
   * Channel to use filters in
   */
  @Input() channel!: BehaviorSubject<DataFilter<any>[]>;

  /**
   * Save filters
   */
  public save() {
    const filters = Object.values(this.filtersGroup).map((filter) => {
      const dataFilter = filter.dataFilter(filter.control.value);

      return {
        identifier: dataFilter.identifier,
        value: dataFilter.value,
      };
    });

    new BroadcastChannel(Reflect.get(this.channel, 'channel').name).postMessage(filters);
  }

  /**
   * Reset filters
   */
  reset() {
    for (const filter of Object.values(this.filtersGroup)) {
      filter.control.reset();
    }
    new BroadcastChannel(Reflect.get(this.channel, 'channel').name).postMessage([]);
  }
}
