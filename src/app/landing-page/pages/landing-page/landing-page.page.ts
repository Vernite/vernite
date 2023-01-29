import { Component } from '@angular/core';
import { faCalendarAlt, faColumns, faSitemap, faTasks } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faSlack } from '@fortawesome/free-brands-svg-icons';

/**
 * Landing page, page
 */
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage {
  /** @ignore */
  faCalendarAlt = faCalendarAlt;

  /** @ignore */
  faGithub = faGithub;

  /** @ignore */
  faSitemap = faSitemap;

  /** @ignore */
  faTasks = faTasks;

  /** @ignore */
  faSlack = faSlack;

  /** @ignore */
  faColumns = faColumns;
}
