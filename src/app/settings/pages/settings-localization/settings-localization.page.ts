import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { requiredValidator } from '@main/validators/required.validator';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-settings-localization-page',
  templateUrl: './settings-localization.page.html',
  styleUrls: ['./settings-localization.page.scss'],
})
export class SettingsLocalizationPage {
  public form = new FormGroup({
    language: new FormControl('', requiredValidator()),
    dateFormat: new FormControl(''),
  });

  // TODO: Move this section to a service
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
      code: 'it-IT',
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
      code: 'uk-UA',
      name: 'Українська',
    },
  ];

  dateFormats = [
    $localize`YYYY-MM-DD`,
    $localize`DD-MM-YYYY`,
    $localize`MM/DD/YYYY`,
    $localize`DD.MM.YYYY`,
  ].map((format) => ({
    format,
    example: dayjs().format(format),
  }));

  constructor() {}

  changeLanguage() {
    localStorage.setItem('language', this.form.value.language);
    location.href = `https://workflow.adiantek.ovh/${this.form.value.language}/settings/localization`;
  }

  submit() {
    this.changeLanguage();
  }
}
