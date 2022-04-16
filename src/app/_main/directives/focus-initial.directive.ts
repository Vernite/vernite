import { FocusableOption } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Host,
  Input,
  Optional,
  Self,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appFocusInitial]',
})
export class FocusInitialDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.el.nativeElement.__ngContext__[33].focus();
  }
}
