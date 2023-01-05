import { Component, HostBinding, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * Sidebar group component
 */
@Component({
  selector: 'sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
})
export class SidebarGroupComponent {
  /** Sidebar group icon */
  @Input() icon?: IconDefinition | string;
  /** Sidebar group collapsed state */
  @HostBinding('class.collapsed') @Input() collapsed = true;
}
