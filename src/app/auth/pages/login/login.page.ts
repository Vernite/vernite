import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@auth/services/user.service';
import { catchError, EMPTY, Subscription } from 'rxjs';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}

  private loginSubscription?: Subscription;
  public error?: string;

  /**
   * Form group for login.
   */
  public form = new FormGroup({
    email: new FormControl('', [requiredValidator()], []),
    password: new FormControl('', [requiredValidator()], []),
    remember: new FormControl('', [], []),
  });

  ngOnInit() {
    this.userService.getMyself().subscribe(() => {
      localStorage.setItem('logged', 'true');
      this.router.navigate(['/']);
    });
  }

  login() {
    if (this.loginSubscription && !this.loginSubscription.closed) return;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.loginSubscription = this.authService
        .login(this.form.value)
        .pipe(
          catchError((e) => {
            this.handleError(e);
            return EMPTY;
          }),
        )
        .subscribe((response) => {
          if (response.deleted) {
            this.router.navigate(['/auth/restore-account']);
          } else {
            localStorage.setItem('logged', 'true');
            this.router.navigate(['/']);
          }
        });
    }
  }

  handleError(error: any) {
    switch (error.status) {
      case 403:
        this.error = $localize`User is already logged`;
        break;
      case 404:
        this.error = $localize`Wrong username or password`;
        break;
    }
  }
}
