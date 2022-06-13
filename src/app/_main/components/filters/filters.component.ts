import { Component, Input } from '@angular/core';
import { FormArray, FormControl, NgControl } from '@angular/forms';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { Filter } from '@main/interfaces/filters.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent extends ControlAccessor {
  @Input() set filters(filters: Filter[]) {
    this.form = new FormArray(
      filters.map((filter) => {
        return new FormControl(filter.value);
      }),
    );
    this._filters = filters;
  }

  public get filters() {
    return this._filters;
  }

  private _filters: Filter[] = [];
  public form?: FormArray;

  constructor(public override ngControl: NgControl) {
    super(ngControl);
  }

  public getControl(index: number) {
    const control = (this.form?.controls[index] || new FormControl()) as FormControl;
    return control;
  }

  public saveFilters() {
    if (!this.form) return;

    let formValue: Filter[] = [];

    for (const [index, filter] of this.filters.entries()) {
      const filterValue = Number(this.form?.controls[index].value) as 0 | 1;
      filter.value = filterValue;
      formValue.push(filter);
    }

    this.control.setValue(formValue);
  }
}
