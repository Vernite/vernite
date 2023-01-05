import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { AuthService } from '@auth/services/auth/auth.service';
import { UserService } from '@auth/services/user/user.service';
import { requiredValidator } from '@main/validators/required.validator';
import { SnackbarService } from '@main/services/snackbar/snackbar.service';

/**
 * Settings account page component
 */
@Component({
  selector: 'app-settings-account-page',
  templateUrl: './settings-account.page.html',
  styleUrls: ['./settings-account.page.scss'],
})
export class SettingsAccountPage implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
  ) {}

  /** Form to edit account data */
  public form = new FormGroup({
    email: new FormControl('', requiredValidator()),
    name: new FormControl('', requiredValidator()),
    surname: new FormControl('', requiredValidator()),
    username: new FormControl('', requiredValidator()),
  });

  ngOnInit() {
    this.userService.getMyself().subscribe((response) => {
      this.form.patchValue(response);
    });
  }

  /**
   * Submit form to update account data
   */
  submit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    this.userService.update(this.form.value).subscribe(() => {
      this.snackbarService.show($localize`Account updated successfully`);
    });
  }

  /**
   * Reset password
   * @TODO Add confirmation dialog
   */
  resetPassword() {
    const email = this.form.get('email').value;

    this.authService.resetPassword({ email }).subscribe(() => {
      this.authService.logout().subscribe();
    });
  }

  /**
   * Delete account
   * @TODO Add confirmation dialog
   */
  deleteAccountMailCheck() {
    this.authService.deleteAccount().subscribe(() => {
      this.authService.logout().subscribe();
    });
  }
}
