import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[click-stop-propagation]',
})
export class ClickStopPropagationDirective {
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
