import { Component, Input, ElementRef, ViewChild, AfterViewInit, HostBinding } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Nav element component
 */
@Component({
  selector: 'app-nav-element',
  templateUrl: './nav-element.component.html',
  styleUrls: ['./nav-element.component.scss'],
})
export class NavElementComponent implements AfterViewInit {
  /**
   * Nav element router link
   * @TODO Remove this property and use routerLink from @angular/router
   */
  @Input() routerLink?: string;

  /**
   * Flag to show options
   */
  @Input() showOptions?: boolean;

  /**
   * Nav element icon
   */
  @Input() icon?: string | IconDefinition;

  /**
   * Nav element collapsed state
   */
  @Input() @HostBinding('class.collapsed') collapsed = false;

  /**
   * Nav element active state
   */
  public active: boolean = false;

  /**
   * Nav element show arrow state
   */
  public showArrow$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Nav element list element
   */
  @ViewChild('elementList') listElement!: ElementRef<HTMLElement>;

  /** @ignore */
  faAngleDown = faAngleDown;

  constructor() {}

  ngAfterViewInit(): void {
    this.listElement.nativeElement.style.maxHeight = '0';
    setTimeout(() => {
      this.showArrow$.next(Boolean(this.listElement?.nativeElement.children.length));
    });
  }

  /**
   * Expand navigation element
   */
  public openNavElement() {
    this.listElement.nativeElement.style.maxHeight =
      this.listElement.nativeElement.scrollHeight + 'px';
    this.active = true;
    setTimeout(() => {
      this.listElement.nativeElement.style.maxHeight = 'none';
    }, 500);
  }

  /**
   * Close navigation element
   */
  public closeNavElement() {
    this.listElement.nativeElement.style.maxHeight =
      this.listElement.nativeElement.scrollHeight + 'px';
    setTimeout(() => {
      this.active = false;
      this.listElement.nativeElement.style.maxHeight = '0';
    });
  }

  /**
   * Toggle navigation element
   */
  public toggleNavElement() {
    if (!this.active) {
      this.openNavElement();
    } else {
      this.closeNavElement();
    }
  }
}
