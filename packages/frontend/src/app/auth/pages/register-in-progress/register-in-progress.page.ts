import { Component } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Register in progress page component
 */
@Component({
  selector: 'app-register-in-progress-page',
  templateUrl: './register-in-progress.page.html',
  styleUrls: ['./register-in-progress.page.scss'],
})
export class RegisterInProgressPage {
  constructor() {}

  /** @ignore */
  faChevronLeft = faChevronLeft;

  faChevronRight = faChevronRight;
}
