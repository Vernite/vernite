import { AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { Debug } from '@main/decorators/debug.decorator';
import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent extends ControlAccessor implements AfterViewInit {
  @ContentChildren(OptionComponent) queryOptions?: QueryList<OptionComponent>;
  options?: any[];
  optionsMap?: Map<any, any> = new Map();
  @Input() floatingLabel: string = '';
  yet: boolean = false;

  get selected() {
    return this.optionsMap?.get(this.control.value);
  }

  ngAfterViewInit(): void {
    this.options = this.queryOptions?.map((x) => {
      const option = { value: x.value, viewValue: x.viewValue, icon: x.icon };

      this.optionsMap!.set(x.value, option);
      return option;
    });
    setTimeout(() => {
      this.yet = true;
    });
  }
}
