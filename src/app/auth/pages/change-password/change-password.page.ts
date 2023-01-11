import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordValidator } from '@main/validators/password.validator';
import { requiredValidator } from '@main/validators/required.validator';
import { sameAsValidator } from '@main/validators/same-as.validator';
import { Subscription } from 'rxjs';
import { AuthService } from '@auth/services/auth/auth.service';

/**
 * Change password page component
 */
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  /**
   * Token from query params.
   */
  private token?: string;

  /**
   * Reset subscription subscription.
   * @TODO Replace with loader.
   */
  private resetSubscription?: Subscription;

  /**
   * Form group for setting new password.
   */
  public form = new FormGroup({
    password: new FormControl('', [requiredValidator(), passwordValidator()], []),
    repeatPassword: new FormControl(
      '',
      [
        requiredValidator(),
        passwordValidator(),
        sameAsValidator('password', $localize`Given passwords are not the same `),
      ],
      [],
    ),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    const { token } = this.activatedRoute.snapshot.queryParams;
    this.token = token;
  }

  /**
   * Save new password
   */
  setNewPassword() {
    if (this.resetSubscription && !this.resetSubscription.closed) return;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid && this.token) {
      this.resetSubscription = this.authService
        .setNewPasswordFromToken(this.token, this.form.value.password)
        .subscribe(() => {
          this.router.navigate(['/auth/login']);
        });
    }
  }
}
