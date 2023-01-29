import { Directive, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

/**
 * Directive to detect click outside of an element
 */
@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  /** Click outside event */
  @Output() clickOutside = new EventEmitter<MouseEvent>();

  /** Skipped first click */
  private _skippedFirst = false;

  constructor(private elementRef: ElementRef) {}

  /** On click event handler */
  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
    if (!this._skippedFirst) {
      this._skippedFirst = true;
      return true;
    }

    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }

    return true;
  }
}
