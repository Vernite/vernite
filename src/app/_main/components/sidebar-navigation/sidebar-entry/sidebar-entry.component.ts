import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { faEllipsisV, IconDefinition, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sidebar-entry',
  templateUrl: './sidebar-entry.component.html',
  styleUrls: ['./sidebar-entry.component.scss'],
})
export class SidebarEntryComponent {
  @Input() showOptions: boolean = false;
  @Input() icon?: IconDefinition | string;
  @Input() textIcon: boolean = false;
  @Input() imageIcon?: string = undefined;
  @HostBinding('class.expandable') @Input() expandable = false;
  @HostBinding('class.collapsed') @Input() collapsed: boolean = false;
  @ViewChild('title') title?: ElementRef<HTMLElement>;

  get text() {
    return this.title?.nativeElement.innerText || '';
  }

  get shortText() {
    return this.text.substring(0, 2);
  }

  public expanded = false;

  /** @ignore */
  faEllipsisV = faEllipsisV;

  /** @ignore */
  faChevronRight = faChevronRight;

  toggle() {
    this.expanded = !this.expanded;
  }
}
