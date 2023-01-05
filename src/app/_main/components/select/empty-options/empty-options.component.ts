import { Component, HostBinding } from '@angular/core';

/**
 * Empty options component
 */
@Component({
  selector: 'app-empty-options',
  templateUrl: './empty-options.component.html',
  styleUrls: ['./empty-options.component.scss'],
})
export class EmptyOptionsComponent {
  /** Display style binding */
  @HostBinding('style.display') display: 'inline' | 'none' = 'inline';

  /**
   * Hide component
   */
  public hide() {
    this.display = 'none';
  }

  /**
   * Show component
   */
  public show() {
    this.display = 'inline';
  }
}
