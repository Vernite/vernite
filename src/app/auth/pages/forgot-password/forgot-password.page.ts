import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredValidator } from '@main/validators/required.validator';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

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
      this.resetSubscription = this.authService.login(this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
