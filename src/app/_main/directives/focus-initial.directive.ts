import { AfterViewInit, Directive, ElementRef } from '@angular/core';

/**
 * Directive to focus on the first input element on the page
 */
@Directive({
  selector: '[appFocusInitial]',
})
export class FocusInitialDirective implements AfterViewInit {
  /**
   * Default constructor of the directive.
   * @param el Reference to attached element
   */
  constructor(private el: ElementRef) {}

  /**
   * Lifecycle hook to initialize the directive.
   */
  ngAfterViewInit(): void {
    this.el.nativeElement.__ngContext__[33].focus();
  }
}
