import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredValidator } from '@main/validators/required.validator';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  constructor(private authService: AuthService, private router: Router) {}

  private resetSubscription?: Subscription;

  /**
   * Form group for setting new password.
   */
  public form = new FormGroup({
    password: new FormControl('', [requiredValidator()], []),
    repeatPassword: new FormControl('', [requiredValidator()], []),
  });

  setNewPassword() {
    if (this.resetSubscription && !this.resetSubscription.closed) return;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.resetSubscription = this.authService.setNewPassword(this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
