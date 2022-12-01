import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[collapsable]',
})
export class CollapsableDirective {
  @HostBinding('style.max-height')
  public maxHeight = '0';

  @HostBinding('style.transition')
  public transition = 'max-height 0.25s ease-in-out';

  @Input()
  @HostBinding('style.overflow')
  public overflow = 'hidden';

  private isCollapsed = true;

  @Input()
  public set collapsed(value: boolean) {
    this.isCollapsed = value;

    if (this.isCollapsed) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  public get collapsed(): boolean {
    return this.isCollapsed;
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  public collapse() {
    this.maxHeight = this.elementRef.nativeElement.scrollHeight + 'px';

    setTimeout(() => {
      this.maxHeight = '0';
    });
  }

  public expand() {
    this.maxHeight = this.elementRef.nativeElement.scrollHeight + 'px';

    setTimeout(() => {
      this.maxHeight = 'none';
    }, 250);
  }
}
