import { Component } from '@angular/core';
import { IconService } from '@main/services/icons/icon.service';
import { NotificationService } from '@main/services/notification/notification.service';

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

  constructor(private iconService: IconService, private notificationService: NotificationService) {
    // Initialize icons
    this.iconService.init();

    // Disable animations on page load
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.remove('preload');
    });

    // Initialize notifications
    this.notificationService.init();
  }
}
