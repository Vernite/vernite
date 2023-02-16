import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { requiredValidator } from '@main/validators/required.validator';
import * as dayjs from 'dayjs';
import { UserService } from '../../../auth/services/user/user.service';
import { SnackbarService } from '@main/services/snackbar/snackbar.service';
import { maxLengthValidator } from '@main/validators/max-length.validator';
import { environment } from './../../../../environments/environment';

/**
 * Component to display localization settings
 */
@Component({
  selector: 'app-settings-localization-page',
  templateUrl: './settings-localization.page.html',
  styleUrls: ['./settings-localization.page.scss'],
})
export class SettingsLocalizationPage implements OnInit {
  /** Form to change localization settings */
  public form = new FormGroup({
    language: new FormControl('', [requiredValidator(), maxLengthValidator(5)]),
    dateFormat: new FormControl('', [requiredValidator(), maxLengthValidator(10)]),
    timeFormat: new FormControl('', [requiredValidator()]),
    firstDayOfWeek: new FormControl(0, [requiredValidator()]),
  });

  /**
   * List of available languages
   * @TODO Move this list to service
   */
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

  /**
   * Available date formats
   * @TODO Move this list to service
   */
  dateFormats = ['YYYY-MM-DD', 'DD-MM-YYYY', 'MM/DD/YYYY', 'DD.MM.YYYY'].map((format) => ({
    format,
    example: dayjs().format(format),
  }));

  /**
   * Available time formats
   * @TODO Move this list to service
   */
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

  /** Refresh application language based on value filled in form */
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

  /** Submit form */
  submit() {
    this.changeLanguage();
  }
}
