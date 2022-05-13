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
      code: 'de-DE',
      name: 'Deutsch',
    },
    {
      code: 'en-GB',
      name: 'English (British)',
    },
    {
      code: 'es-ES',
      name: 'Español',
    },
    {
      code: 'it-It',
      name: 'Italiano',
    },
    {
      code: 'pl-PL',
      name: 'Polski',
    },
    {
      code: 'en-US',
      name: 'English (American)',
    },
    {
      code: 'uk-UK',
      name: 'Українська',
    },
  ];

  constructor() {}

  ngOnInit() {}

  changeLanguage() {
    location.href = `https://workflow.adiantek.ovh/${this.form.value.language.code}/settings/localization`;
  }

  submit() {}
}
