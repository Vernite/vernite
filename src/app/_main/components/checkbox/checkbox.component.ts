import { Component, Input } from '@angular/core';
import { ControlAccessor } from '@main/classes/control-accessor.class';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent extends ControlAccessor {
  @Input() label: string = '';
}
