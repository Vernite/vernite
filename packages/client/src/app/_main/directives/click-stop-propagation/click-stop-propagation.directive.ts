import { Directive, HostListener } from '@angular/core';

/**
 * Directive to stop propagation of click event
 */
@Directive({
  selector: '[click-stop-propagation]',
})
export class ClickStopPropagationDirective {
  /** On click event handler */
  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();

    window.document.dispatchEvent(
      new Event('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  }
}
