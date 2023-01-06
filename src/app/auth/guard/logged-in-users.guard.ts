import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth/auth.service';

/**
 * Logged in users guard
 */
@Injectable({ providedIn: 'root' })
export class LoggedInUsersGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Check if user is logged in
   * @returns true if user is logged in, false otherwise
   */
  canActivate() {
    if (this.authService.isLocallyLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
