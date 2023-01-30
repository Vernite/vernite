import { Directive, ViewContainerRef } from '@angular/core';

/**
 * View container directive
 */
@Directive({
  selector: '[view-container]',
})
export class ViewContainerDirective {
  /** Default constructor */
  constructor(
    /** Reference to view container */
    public viewContainerRef: ViewContainerRef,
  ) {}
}
