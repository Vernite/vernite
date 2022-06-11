import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator } from '@main/validators/email.validator';
import { passwordValidator } from '@main/validators/password.validator';
import { sameAsValidator } from '@main/validators/same-as.validator';
import { catchError, EMPTY, Subscription } from 'rxjs';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { AuthService } from '../../services/auth.service';

enum RegisterStage {
  IMPORTANT_DATA,
  PERSONAL_DATA,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  constructor(private authService: AuthService, private router: Router) {}

  private registerSubscription?: Subscription;
  public stage?: RegisterStage = RegisterStage.IMPORTANT_DATA;
  RegisterStage = RegisterStage;

  public error?: string;

  /**
   * Form group for register.
   */
  public form = new FormGroup({
    email: new FormControl('', [requiredValidator(), emailValidator()], []),
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
    name: new FormControl('', [requiredValidator()], []),
    surname: new FormControl('', [requiredValidator()], []),
    username: new FormControl('', [requiredValidator()], []),
    agreements: new FormControl('', [requiredValidator()], []),
  });

  nextStage() {
    let formFields: string[] = ['email', 'password', 'repeatPassword', 'agreements'];
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

  previousStage() {
    this.stage = RegisterStage.IMPORTANT_DATA;
  }

  register() {
    if (this.registerSubscription && !this.registerSubscription.closed) return;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.registerSubscription = this.authService
        .register(this.form.value)
        .pipe(
          catchError((e) => {
            this.handleError(e);
            return EMPTY;
          }),
        )
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }

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
    }
  }
}
