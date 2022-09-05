import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Router } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { requiredValidator } from '@main/validators/required.validator';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-page',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  constructor(private authService: AuthService, private router: Router) {}

  faAngleDown = faAngleDown;

  private resetSubscription?: Subscription;

  /**
   * Form group for reset password.
   */
  public form = new FormGroup({
    email: new FormControl('', [requiredValidator()], []),
  });

  resetPassword() {
    if (this.resetSubscription && !this.resetSubscription.closed) return;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.resetSubscription = this.authService.resetPassword(this.form.value).subscribe();
    }
  }
}
