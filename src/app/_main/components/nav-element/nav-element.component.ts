import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav-element',
  templateUrl: './nav-element.component.html',
  styleUrls: ['./nav-element.component.scss'],
})
export class NavElementComponent implements AfterViewInit {
  @Input()
  public routerLink?: string;

  @Input()
  public showOptions?: boolean;

  public active: boolean = false;

  public showArrow$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showArrow$.next(Boolean(this.listElement?.nativeElement.children.length));
    });
  }
}
