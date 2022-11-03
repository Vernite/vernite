import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { requiredValidator } from '@main/validators/required.validator';
import * as dayjs from 'dayjs';
import { UserService } from '../../../auth/services/user/user.service';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '@main/services/snackbar/snackbar.service';

@Component({
  selector: 'app-settings-localization-page',
  templateUrl: './settings-localization.page.html',
  styleUrls: ['./settings-localization.page.scss'],
})
export class SettingsLocalizationPage implements OnInit {
  public form = new FormGroup({
    language: new FormControl('', requiredValidator()),
    dateFormat: new FormControl(''),
    timeFormat: new FormControl(''),
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

  dateFormats = ['YYYY-MM-DD', 'DD-MM-YYYY', 'MM/DD/YYYY', 'DD.MM.YYYY'].map((format) => ({
    format,
    example: dayjs().format(format),
  }));

  timeFormats = ['HH:mm', 'hh:mm A', 'hh:mm a'].map((format) => ({
    format,
    example: dayjs().format(format),
  }));

  constructor(private userService: UserService, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.userService.getMyself().subscribe((user) => {
      this.form.patchValue(user);
    });
  }

  changeLanguage() {
    this.userService.update(this.form.value).subscribe(() => {
      localStorage.setItem('language', this.form.value.language);

      if (environment.production) {
        location.href = `https://vernite.dev/${this.form.value.language}/settings/localization`;
      } else {
        this.snackbarService.show('Language changed (But nothing changes in dev mode)');
      }
    });
  }

  submit() {
    this.changeLanguage();
  }
}
