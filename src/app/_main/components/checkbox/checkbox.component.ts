import { Component } from '@angular/core';
import { ControlAccessor } from '@main/classes/control-accessor/control-accessor.class';

/**
 * Checkbox component
 */
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent extends ControlAccessor {}
