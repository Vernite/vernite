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

/**
 * Directive to resize an element.
 */
@Directive({
  selector: '[resize]',
})
export class ResizeDirective implements OnInit {
  /** width before grabbing */
  private oldX = 0;
  /** is grabbing */
  private isGrabbing = false;
  /** previous transition property value */
  private oldTransition: string = 'none';

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

  /**
   * Mouse move event handler
   * @param event mouse event object
   */
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

  /**
   * Mouse up event handler
   * @param event mouse event object
   */
  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    this.isGrabbing = false;
    this.enableAnimations();
    localStorage.setItem('resize', this.width.toString());
  }

  /**
   * Mouse down event handler
   * @param event mouse event object
   */
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if ((event.target as HTMLElement).tagName !== 'RESIZE-HANDLE') {
      return;
    }

    this.isGrabbing = true;
    this.oldX = event.clientX;
    this.disableAnimations();
  }

  /**
   * Disable animations
   */
  disableAnimations() {
    this.oldTransition = this.elementRef.nativeElement.style.transition;
    this.elementRef.nativeElement.style.transition = 'none';
  }

  /**
   * Enable animations
   */
  enableAnimations() {
    this.elementRef.nativeElement.style.transition = this.oldTransition;
  }

  /**
   * Create resize handle
   * @param side side of the handle
   */
  createResizeHandle(side: 'right') {
    const componentRef = this.viewContainerRef.createComponent(ResizeHandleComponent);
    componentRef.instance.side = side;
    const host = this.elementRef.nativeElement;
    host.appendChild(componentRef.location.nativeElement);
  }
}
