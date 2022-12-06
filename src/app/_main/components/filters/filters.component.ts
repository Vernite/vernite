import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { DataFilter } from '@main/interfaces/filters.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { FilterControls } from './filter-entry.type';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  @Input() filtersGroup!: FilterControls;
  @Input() channel!: BehaviorSubject<DataFilter<any>[]>;

  public save() {
    const filters = Object.values(this.filtersGroup).map((filter) => {
      console.log(filter.control.value);
      const dataFilter = filter.dataFilter(filter.control.value);

      return {
        identifier: dataFilter.identifier,
        value: dataFilter.value,
      };
    });

    new BroadcastChannel(Reflect.get(this.channel, 'channel').name).postMessage(filters);
  }

  reset() {
    for (const filter of Object.values(this.filtersGroup)) {
      filter.control.reset();
    }
    new BroadcastChannel(Reflect.get(this.channel, 'channel').name).postMessage([]);
  }
}
