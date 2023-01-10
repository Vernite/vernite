import { Component } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Register in progress page component
 */
@Component({
  selector: 'app-register-token-expired-page',
  templateUrl: './register-token-expired.page.html',
  styleUrls: ['./register-token-expired.page.scss'],
})
export class RegisterTokenExpiredPage {
  constructor() {}

  /** @ignore */
  faChevronLeft = faChevronLeft;

  faChevronRight = faChevronRight;
}
