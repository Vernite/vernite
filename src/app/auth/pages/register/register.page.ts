import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from '@main/validators/password.validator';
import { Subscription } from 'rxjs';
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

  /**
   * Form group for register.
   */
  public form = new FormGroup({
    email: new FormControl('', [requiredValidator()], []),
    password: new FormControl('', [requiredValidator(), passwordValidator()], []),
    repeatPassword: new FormControl('', [requiredValidator(), passwordValidator()], []),
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
      this.registerSubscription = this.authService.register(this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
