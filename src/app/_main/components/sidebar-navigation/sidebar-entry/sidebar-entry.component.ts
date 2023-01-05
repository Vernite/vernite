import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { faEllipsisV, IconDefinition, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Sidebar entry component
 */
@Component({
  selector: 'sidebar-entry',
  templateUrl: './sidebar-entry.component.html',
  styleUrls: ['./sidebar-entry.component.scss'],
})
export class SidebarEntryComponent {
  /** Show options flag */
  @Input() showOptions: boolean = false;
  /** Sidebar entry icon */
  @Input() icon?: IconDefinition | string;
  /** Sidebar entry text icon */
  @Input() textIcon: boolean = false;
  /** Sidebar entry image icon */
  @Input() imageIcon?: string = undefined;
  /** Sidebar entry expandable state */
  @HostBinding('class.expandable') @Input() expandable = false;
  /** Sidebar entry collapsed state */
  @HostBinding('class.collapsed') @Input() collapsed: boolean = false;
  /** Sidebar entry title */
  @ViewChild('title') title?: ElementRef<HTMLElement>;

  /** text getter */
  get text() {
    return this.title?.nativeElement.innerText || '';
  }

  /** short text getter (first two letters) */
  get shortText() {
    return this.text.substring(0, 2);
  }

  /** expanded state */
  public expanded = false;

  /** @ignore */
  faEllipsisV = faEllipsisV;

  /** @ignore */
  faChevronRight = faChevronRight;

  /** toggle expanded state */
  toggle() {
    this.expanded = !this.expanded;
  }
}
