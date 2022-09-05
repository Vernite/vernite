import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * Button component to visualize the general clickable elements on the page.
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /**
   * Style variant of the button.
   */
  @Input() variant: 'primary' | 'secondary' | 'important' = 'secondary';

  /**
   * Button behavior in forms. If this property is set to `submit`, this button will be able to submit the
   * form (perform submit event on click). If set to `button`, only the specified `(click)` action will be
   * executed.
   */
  @Input() type: 'button' | 'submit' = 'submit';

  /**
   * Information about the pending. If button is pending the loader icon will be shown.
   */
  @Input() pending?: boolean = false;

  /**
   * Icon to display on the button.
   */
  @Input() icon?: string | IconDefinition;

  /**
   * Reference to native button element.
   */
  @ViewChild('btn') elementRef!: ElementRef<HTMLButtonElement>;

  /**
   * Focus the native button element.
   */
  focus() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 200);
  }
}
