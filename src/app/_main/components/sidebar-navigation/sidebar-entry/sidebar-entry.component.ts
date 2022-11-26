import { Component, HostBinding, Input } from '@angular/core';
import { faEllipsisV, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sidebar-entry',
  templateUrl: './sidebar-entry.component.html',
  styleUrls: ['./sidebar-entry.component.scss'],
})
export class SidebarEntryComponent {
  @Input() expandable = false;
  @Input() showOptions = false;
  @Input() icon?: IconDefinition | string;
  @HostBinding('class.collapsed') @Input() collapsed: boolean = false;

  /** @ignore */
  faEllipsisV = faEllipsisV;
}
