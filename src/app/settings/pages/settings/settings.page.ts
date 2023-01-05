import { Component } from '@angular/core';
import { faAddressCard, faCircleNodes, faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';

/**
 * Component to display settings page
 */
@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  /** @ignore */
  faUser = faUser;

  /** @ignore */
  faGlobe = faGlobe;

  /** @ignore */
  faCircleNodes = faCircleNodes;

  /** @ignore */
  faAddressCard = faAddressCard;

  constructor() {}
}
