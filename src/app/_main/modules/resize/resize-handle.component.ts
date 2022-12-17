import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'resize-handle',
  template: ``,
  styleUrls: ['./resize-handle.component.scss'],
})
export class ResizeHandleComponent {
  @HostBinding('class') @Input() side!: 'right';
}
