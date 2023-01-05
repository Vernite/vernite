import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Router } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { requiredValidator } from '@main/validators/required.validator';
import { Subscription } from 'rxjs';
import { AuthService } from '@auth/services/auth/auth.service';

/**
 * Forgot password page component
 */
@Component({
  selector: 'app-forgot-page',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  constructor(private authService: AuthService, private router: Router) {}

  /** @ignore */
  faAngleDown = faAngleDown;

  /**
   * Password reset subscription
   * @TODO Replace with loader.
   */
  private resetSubscription?: Subscription;

  /**
   * Form group for reset password.
   */
  public form = new FormGroup({
    email: new FormControl('', [requiredValidator()], []),
  });

  /**
   * Reset password
   */
  resetPassword() {
    if (this.resetSubscription && !this.resetSubscription.closed) return;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.resetSubscription = this.authService.resetPassword(this.form.value).subscribe();
    }
  }
}
