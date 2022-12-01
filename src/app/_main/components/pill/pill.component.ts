import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
})
export class PillComponent {
  @HostBinding('class') @Input() variant: 'default' | 'small' = 'default';
}
