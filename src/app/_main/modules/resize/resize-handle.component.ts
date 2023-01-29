import { Component, Input, HostBinding } from '@angular/core';

/**
 * Component to resize an element.
 */
@Component({
  selector: 'resize-handle',
  template: ``,
  styleUrls: ['./resize-handle.component.scss'],
})
export class ResizeHandleComponent {
  /** side of the handle */
  @HostBinding('class') @Input() side!: 'right';
}
