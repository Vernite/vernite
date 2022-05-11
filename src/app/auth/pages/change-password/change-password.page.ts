import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from '@main/validators/password.validator';
import { requiredValidator } from '@main/validators/required.validator';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

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
    password: new FormControl('', [requiredValidator(), passwordValidator()], []),
    repeatPassword: new FormControl('', [requiredValidator(), passwordValidator()], []),
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
