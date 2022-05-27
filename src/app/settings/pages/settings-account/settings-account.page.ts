import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '@auth/services/user.service';
import { requiredValidator } from '@main/validators/required.validator';

@Component({
  selector: 'app-settings-account-page',
  templateUrl: './settings-account.page.html',
  styleUrls: ['./settings-account.page.scss'],
})
export class SettingsAccountPage implements OnInit {
  constructor(private userService: UserService) {}

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
}
