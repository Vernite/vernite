import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { AuthService } from '@auth/services/auth.service';
import { UserService } from '@auth/services/user.service';
import { requiredValidator } from '@main/validators/required.validator';

@Component({
  selector: 'app-settings-account-page',
  templateUrl: './settings-account.page.html',
  styleUrls: ['./settings-account.page.scss'],
})
export class SettingsAccountPage implements OnInit {
  constructor(private userService: UserService, private authService: AuthService) {}

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

  submit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    this.userService.update(this.form.value).subscribe(() => {});
  }

  resetPassword() {
    const email = this.form.get('email').value;

    this.authService.resetPassword({ email }).subscribe(() => {
      this.authService.logout().subscribe();
    });
  }

  deleteAccountMailCheck() {
    this.authService.deleteAccount().subscribe(() => {
      // TODO: dodac popup czy na pewno zgadzamy sie na usuniecie konta, jesli tak to infomracja ze zostal wyslany link na maila dezaktywujacy konto i ze ma mozliwosc jego przywrocenia do 7 dni
      this.authService.logout().subscribe();
    });
  }
}
