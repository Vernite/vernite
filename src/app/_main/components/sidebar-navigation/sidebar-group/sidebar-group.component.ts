import { Component, HostBinding, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
})
export class SidebarGroupComponent {
  @Input() icon?: IconDefinition | string;
  @HostBinding('class.collapsed') @Input() collapsed = true;
}
