import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-element',
  templateUrl: './nav-element.component.html',
  styleUrls: ['./nav-element.component.scss'],
})
export class NavElementComponent {
  @Input()
  public routerLink?: string;

  @Input()
  public showOptions?: boolean;

  public active: boolean = false;

  @ViewChild('elementList')
  listElement?: ElementRef;

  faAngleDown = faAngleDown;

  constructor() {}

  public openNavElement() {
    this.active = true;
  }
  public closeNavElement() {
    this.active = false;
  }
  public toggleNavElement() {
    if (!this.active) {
      this.openNavElement();
    } else {
      this.closeNavElement();
    }
  }

  public showArrow(): boolean {
    return Boolean(this.listElement?.nativeElement.children.length);
  }
}
