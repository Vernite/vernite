import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, of, Subscription, switchMap } from 'rxjs';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { AuthService } from '@auth/services/auth/auth.service';
import { Loader } from '../../../_main/classes/loader/loader.class';
import { startLoader, stopLoader } from '../../../_main/operators/loader.operator';

/**
 * Login page component
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Login subscription
   */
  private loginSubscription?: Subscription;

  /**
   * Login error
   */
  public error?: string;

  /**
   * Loader
   */
  public loader = new Loader();

  /** Form group for login. */
  public form = new FormGroup({
    email: new FormControl('', [requiredValidator()], []),
    password: new FormControl('', [requiredValidator()], []),
    remember: new FormControl<boolean>(false, [], []),
  });

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (!isLoggedIn) return;

      localStorage.setItem('logged', 'true');
      this.router.navigate(['/']);
    });
  }

  /**
   * Login
   */
  login() {
    if (this.loginSubscription && !this.loginSubscription.closed) return;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.error = undefined;

      of(null)
        .pipe(
          startLoader(this.loader),
          switchMap(() => this.authService.login(this.form.value)),
          stopLoader(this.loader),
          catchError((e) => {
            this.handleError(e);
            return EMPTY;
          }),
        )
        .subscribe((response) => {
          if (response.deleted) {
            this.router.navigate(['/auth/restore-account']);
          } else {
            this.router.navigate(['/']);
          }
        });
    }
  }

  /**
   * Handle login error
   * @param error Error
   */
  handleError(error: any) {
    switch (error.status) {
      case 403:
        this.error = $localize`User is already logged`;
        this.router.navigate(['/']);
        break;
      case 404:
        this.error = $localize`Wrong username or password`;
        break;
      case 400:
      case 500:
        this.error = $localize`Internal server error`;
    }
  }
}
