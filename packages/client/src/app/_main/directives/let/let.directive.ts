import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Context for ngLet directive
 */
interface LetContext<T> {
  /**
   * Value to be assigned to the template context
   */
  ngLet: T;
}

/**
 * Structural directive that renders a template with a given context
 */
@Directive({
  selector: '[ngLet]',
})
export class LetDirective<T> {
  /**
   * Template context
   */
  private _context: LetContext<T | null> = { ngLet: null };

  constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef<LetContext<T>>) {
    _viewContainer.createEmbeddedView(_templateRef, this._context);
  }

  /**
   * Assigns the value to the template context
   */
  @Input() set ngLet(value: T) {
    this._context.ngLet = value;
  }
}
