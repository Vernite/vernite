import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredValidator } from '@main/validators/required.validator';

@Component({
  selector: 'app-settings-localization-page',
  templateUrl: './settings-localization.page.html',
  styleUrls: ['./settings-localization.page.scss'],
})
export class SettingsLocalizationPage implements OnInit {
  public form = new FormGroup({
    language: new FormControl('', requiredValidator()),
  });

  languages = [
    {
      code: 'pl-PL',
      name: 'Polish',
    },
    {
      code: 'en-US',
      name: 'English',
    },
  ];

  constructor() {}

  ngOnInit() {}

  submit() {
    console.log('submit');
  }
}
