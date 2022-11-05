import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
  public title = 'vernite';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.remove('preload');
    });
    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/dashboard.svg'),
    );
  }
}
