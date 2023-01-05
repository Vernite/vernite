import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { IconDefinition, faCheck } from '@fortawesome/free-solid-svg-icons';

/**
 * Option component
 */
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent {
  /** Option value */
  @Input() @HostBinding('value') value!: any;
  /** Option icon */
  @Input() icon?: string | IconDefinition;
  /** Option checkmark (if true, simple checkmark icon will be shown on the right side of the option) */
  @Input() checkmark?: boolean;
  /** Option view value */
  @Input() view?: string;

  /** Option selected state */
  selected = false;

  /** @ignore */
  faCheck = faCheck;

  /** viewValue getter */
  public get viewValue(): string {
    if (this.view) return this.view;

    // TODO: Optimize this with cache
    return this.ref.nativeElement.innerText;
  }

  constructor(public ref: ElementRef) {}
}
