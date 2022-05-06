import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  constructor(private authService: AuthService, private router: Router) {}

  private registerSubscription?: Subscription;

  /**
   * Form group for register.
   */
  public form = new FormGroup({
    email: new FormControl('', [requiredValidator()], []),
    password: new FormControl('', [requiredValidator()], []),
    repeatPassword: new FormControl('', [requiredValidator()], []),
  });

  register() {
    if (this.registerSubscription && !this.registerSubscription.closed) return;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.registerSubscription = this.authService.login(this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
