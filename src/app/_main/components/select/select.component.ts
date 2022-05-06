import { AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent extends ControlAccessor implements AfterViewInit {
  @ContentChildren(OptionComponent) queryOptions?: QueryList<OptionComponent>;
  options?: any[];
  @Input() floatingLabel: string = '';
  yet: boolean = false;

  ngAfterViewInit(): void {
    this.options = this.queryOptions?.map((x) => {
      return { value: x.value, viewValue: x.viewValue, icon: x.icon };
    });
    setTimeout(() => {
      this.yet = true;
    });
  }
}
