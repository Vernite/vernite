import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { ResizeHandleComponent } from './resize-handle.component';
import { HostBinding } from '@angular/core';

@Directive({
  selector: '[resize]',
})
export class ResizeDirective implements OnInit {
  oldX = 0;
  isGrabbing = false;
  oldTransition: string = 'none';

  @HostBinding('style.width.px') @Input() width!: number;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.createResizeHandle('right');

    const width = localStorage.getItem('resize');
    if (width) {
      this.width = parseInt(width, 10);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isGrabbing) {
      return;
    }
    this.width += event.clientX - this.oldX;
    this.oldX = event.clientX;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    this.isGrabbing = false;
    this.enableAnimations();
    localStorage.setItem('resize', this.width.toString());
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if ((event.target as HTMLElement).tagName !== 'RESIZE-HANDLE') {
      return;
    }

    this.isGrabbing = true;
    this.oldX = event.clientX;
    this.disableAnimations();
  }

  disableAnimations() {
    this.oldTransition = this.elementRef.nativeElement.style.transition;
    this.elementRef.nativeElement.style.transition = 'none';
  }

  enableAnimations() {
    this.elementRef.nativeElement.style.transition = this.oldTransition;
  }

  createResizeHandle(side: 'right') {
    const componentRef = this.viewContainerRef.createComponent(ResizeHandleComponent);
    componentRef.instance.side = side;
    const host = this.elementRef.nativeElement;
    host.appendChild(componentRef.location.nativeElement);
  }
}
