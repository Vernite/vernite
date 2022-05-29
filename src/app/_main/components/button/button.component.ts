import { FocusableOption } from '@angular/cdk/a11y';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * Main button component
 *
 * ```html
 * <app-button variant="primary">Example text</app-button>
 * ```
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements FocusableOption {
  /**
   * Style variant of the button
   */
  @Input() variant: 'primary' | 'secondary' | 'important' = 'secondary';

  @Input() type: 'button' | 'submit' = 'submit';

  /**
   * Information about the pending. If button is pending the loader icon will be shown
   */
  @Input() pending?: boolean = false;

  /**
   * Icon to display on the button
   */
  @Input() icon?: string | IconDefinition;

  /**
   * Reference to native button element
   */
  @ViewChild('btn') button!: ElementRef<HTMLButtonElement>;

  /**
   * Focus the native button element
   */
  focus() {
    setTimeout(() => {
      this.button.nativeElement.focus();
    }, 200);
  }
}
