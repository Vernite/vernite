import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

/**
 * Directive to collapse an element.
 */
@Directive({
  selector: '[collapsable]',
})
export class CollapsableDirective {
  /** Element max height */
  @HostBinding('style.max-height')
  public maxHeight = '0';

  /** Element transition */
  @HostBinding('style.transition')
  public transition = 'max-height 0.25s ease-in-out';

  /** Element overflow */
  @Input()
  @HostBinding('style.overflow')
  public overflow = 'hidden';

  /** Element is collapsed */
  private isCollapsed = true;

  /** Element is collapsed */
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

  /** Collapse element (change its height to minimal) */
  public collapse() {
    this.maxHeight = this.elementRef.nativeElement.scrollHeight + 'px';

    setTimeout(() => {
      this.maxHeight = '0';
    });
  }

  /** Expand element (change its height to maximal) */
  public expand() {
    this.maxHeight = this.elementRef.nativeElement.scrollHeight + 'px';

    setTimeout(() => {
      this.maxHeight = 'none';
    }, 250);
  }
}
