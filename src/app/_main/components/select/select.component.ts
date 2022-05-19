import { AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { Subject } from 'rxjs';
import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent extends ControlAccessor implements AfterViewInit, OnInit {
  @ContentChildren(OptionComponent) queryOptions?: QueryList<OptionComponent>;
  options?: any[];
  optionsMap?: Map<any, any> = new Map();
  @Input() floatingLabel: string = '';
  yet: boolean = false;

  selected$: Subject<any> = new Subject<any>();

  get selected() {
    return this.optionsMap?.get(this.control.value);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.control.valueChanges.subscribe((value) => {
      console.log('Value changed to: ' + value);
      this.optionsMap?.forEach((option, key) => {
        option.selected = key === value;
      });
    });

    this.selected$.subscribe((val) => {
      console.log(val);
    });
  }

  ngAfterViewInit(): void {
    this.queryOptions?.changes.subscribe((options) => {
      console.log('updated options');
      this.updateOptions();
    });
    this.updateOptions();
  }

  updateOptions() {
    console.log(this.control.value);

    this.yet = false;
    this.options = this.queryOptions?.map((x) => {
      const option = { value: x.value, viewValue: x.viewValue, icon: x.icon };

      this.optionsMap!.set(x.value, option);
      return option;
    });
    setTimeout(() => {
      // const value = `${this.control.value}`;

      console.log(typeof this.control.value); // 44
      console.log(this.optionsMap?.get(44)); // [Object object]
      console.log(this.optionsMap?.get(this.control.value)); // undefined

      console.log(this.control.value == 44);

      this.selected$.next(this.optionsMap?.get(this.control.value));
      this.yet = true;
    });
  }
}
