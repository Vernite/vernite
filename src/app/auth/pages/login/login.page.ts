import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Router } from '@angular/router';
import { UserService } from '@auth/services/user/user.service';
import { catchError, EMPTY, Subscription } from 'rxjs';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { AuthService } from '@auth/services/auth/auth.service';
import { Loader } from '../../../_main/classes/loader/loader.class';
import { withLoader } from '../../../_main/operators/loader.operator';

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
  public loader = new Loader();

  /**
   * Form group for login.
   */
  public form = new FormGroup({
    email: new FormControl('', [requiredValidator()], []),
    password: new FormControl('', [requiredValidator()], []),
    remember: new FormControl<boolean>(false, [], []),
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
      this.error = undefined;
      this.loginSubscription = this.authService
        .login(this.form.value)
        .pipe(
          withLoader(this.loader),
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
        this.router.navigate(['/']);
        break;
      case 404:
        this.error = $localize`Wrong username or password`;
        break;
    }
  }
}
