import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth/auth.service';

/**
 * Restore account page component
 */
@Component({
  selector: 'app-restore-account-page',
  templateUrl: './restore-account.page.html',
  styleUrls: ['./restore-account.page.scss'],
})
export class RestoreAccountPage {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Logout user
   */
  logout() {
    this.authService.logout().subscribe();
  }

  /**
   * Restore account
   */
  restore() {
    this.authService.recoverAccount().subscribe();
  }
}
