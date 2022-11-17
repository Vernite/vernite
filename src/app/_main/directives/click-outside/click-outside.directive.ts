import {
  Directive,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  OnInit,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<MouseEvent>();

  private _skippedFirst = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
    if (!this._skippedFirst) {
      this._skippedFirst = true;
      return true;
    }

    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      console.log('click outside');
      this.clickOutside.emit();
    }

    return true;
  }
}
