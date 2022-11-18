import { Component, Input, ElementRef, ViewChild, AfterViewInit, HostBinding } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-nav-element',
  templateUrl: './nav-element.component.html',
  styleUrls: ['./nav-element.component.scss'],
})
export class NavElementComponent implements AfterViewInit {
  @Input() routerLink?: string;

  @Input() showOptions?: boolean;

  @Input() icon?: string | IconDefinition;

  @Input() @HostBinding('class.collapsed') collapsed = false;

  public active: boolean = false;

  public showArrow$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @ViewChild('elementList') listElement!: ElementRef<HTMLElement>;

  faAngleDown = faAngleDown;

  constructor() {}

  public openNavElement() {
    this.listElement.nativeElement.style.maxHeight =
      this.listElement.nativeElement.scrollHeight + 'px';
    this.active = true;
    setTimeout(() => {
      this.listElement.nativeElement.style.maxHeight = 'none';
    }, 500);
  }
  public closeNavElement() {
    this.listElement.nativeElement.style.maxHeight =
      this.listElement.nativeElement.scrollHeight + 'px';
    setTimeout(() => {
      this.active = false;
      this.listElement.nativeElement.style.maxHeight = '0';
    });
  }
  public toggleNavElement() {
    if (!this.active) {
      this.openNavElement();
    } else {
      this.closeNavElement();
    }
  }

  ngAfterViewInit(): void {
    this.listElement.nativeElement.style.maxHeight = '0';
    setTimeout(() => {
      this.showArrow$.next(Boolean(this.listElement?.nativeElement.children.length));
    });
  }
}
