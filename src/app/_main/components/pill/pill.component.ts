import { Component, Input, HostBinding } from '@angular/core';

/**
 * Pill component
 */
@Component({
  selector: 'pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
})
export class PillComponent {
  /** Pill variant */
  @HostBinding('class') @Input() variant: 'default' | 'small' = 'default';
}
