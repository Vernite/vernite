import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Router } from '@angular/router';
import { emailValidator } from '@main/validators/email.validator';
import { passwordValidator } from '@main/validators/password.validator';
import { sameAsValidator } from '@main/validators/same-as.validator';
import { catchError, EMPTY, Subscription, of, switchMap } from 'rxjs';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { AuthService } from '@auth/services/auth/auth.service';
import { Loader } from '../../../_main/classes/loader/loader.class';
import { startLoader, stopLoader } from '../../../_main/operators/loader.operator';
import { ReCaptchaV3Service } from 'ng-recaptcha';

/**
 * Register stages
 */
enum RegisterStage {
  IMPORTANT_DATA,
  PERSONAL_DATA,
}

/**
 * Register page component
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  constructor(
    private authService: AuthService,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {}

  /** Register subscription */
  private registerSubscription?: Subscription;

  /** Current register stage */
  public stage?: RegisterStage = RegisterStage.IMPORTANT_DATA;

  /** @ignore */
  RegisterStage = RegisterStage;

  /** Register error */
  public error?: string;

  /** Loader */
  public loader = new Loader();

  /**
   * Form group for register.
   */
  public form = new FormGroup({
    email: new FormControl('', [requiredValidator(), emailValidator()]),
    password: new FormControl('', [requiredValidator(), passwordValidator()]),
    repeatPassword: new FormControl('', [
      requiredValidator(),
      passwordValidator(),
      sameAsValidator('password', $localize`Given passwords are not the same`),
    ]),
    name: new FormControl('', [requiredValidator()]),
    surname: new FormControl('', [requiredValidator()]),
    username: new FormControl('', [requiredValidator()]),
    agreements: new FormControl('', [requiredValidator()]),
  });

  /**
   * Next register stage
   */
  nextStage() {
    // TODO: Think something about this stages and validation
    let formFields: ['email', 'password', 'repeatPassword', 'agreements'] = [
      'email',
      'password',
      'repeatPassword',
      'agreements',
    ];
    let correctData: boolean = true;
    for (let field of formFields) {
      this.form.get(field)?.markAsTouched();
      this.form.get(field)?.updateValueAndValidity();
      if (this.form.get(field)?.invalid) {
        correctData = false;
      }
    }
    if (correctData) {
      this.stage = RegisterStage.PERSONAL_DATA;
    }
  }

  /**
   * Previous register stage
   */
  previousStage() {
    this.stage = RegisterStage.IMPORTANT_DATA;
  }

  /**
   * Register
   */
  register() {
    if (this.registerSubscription && !this.registerSubscription.closed) return;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.error = undefined;
      this.registerSubscription = of(null)
        .pipe(
          startLoader(this.loader),
          switchMap(() => this.authService.register(this.form.value)),
          stopLoader(this.loader),
          catchError((e) => {
            this.handleError(e);
            return EMPTY;
          }),
        )
        .subscribe(() => {
          this.router.navigate(['/auth/register/in-progress']);
        });
    }
  }

  /**
   * Handle registration error
   * @param error Error
   */
  handleError(error: any) {
    switch (error.status) {
      case 422:
        switch (error.error.message) {
          case 'this email is already taken':
            this.error = $localize`Email is already taken`;
            break;
          case 'this username is already taken':
            this.error = $localize`Username is already taken`;
        }
        break;
      case 400:
      case 500:
        this.error = $localize`Internal server error`;
    }
  }
}
