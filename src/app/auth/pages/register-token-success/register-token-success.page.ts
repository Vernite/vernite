import { Component } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Register in progress page component
 */
@Component({
  selector: 'app-register-token-success-page',
  templateUrl: './register-token-success.page.html',
  styleUrls: ['./register-token-success.page.scss'],
})
export class RegisterTokenSuccessPage {
  constructor() {}

  /** @ignore */
  faChevronLeft = faChevronLeft;

  faChevronRight = faChevronRight;
}
