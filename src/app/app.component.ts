import { Component } from '@angular/core';

/**
 * Main Component with basic layout and main router outlet
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Title of the page
   */
  public title = 'workflow';

  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.remove('preload');
    });
  }
}
