import { Component, Input } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-element',
  templateUrl: './nav-element.component.html',
  styleUrls: ['./nav-element.component.scss'],
})
export class NavElementComponent {
  @Input()
  public routerLink?: string;

  public active: boolean = false;

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

  public showOptions(): boolean {
    return true;
  }

  public showArrow(): boolean {
    return true;
  }
}
