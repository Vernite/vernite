import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredValidator } from '@main/validators/required.validator';

@Component({
  selector: 'app-settings-account-page',
  templateUrl: './settings-account.page.html',
  styleUrls: ['./settings-account.page.scss'],
})
export class SettingsAccountPage implements OnInit {
  constructor() {}

  public form = new FormGroup({
    email: new FormControl('', requiredValidator()),
    name: new FormControl('', requiredValidator()),
    surname: new FormControl('', requiredValidator()),
    username: new FormControl('', requiredValidator()),
  });

  ngOnInit() {}

  submit() {
    console.log('submit');
  }
}
