/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from '@main/_main.module';

import { SettingsLocalizationPage } from './settings-localization.page';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'packages/client/src/environments/environment';

describe('SettingsLocalizationPage', () => {
  let component: SettingsLocalizationPage;
  let fixture: ComponentFixture<SettingsLocalizationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule, BrowserAnimationsModule, ReactiveFormsModule],
      declarations: [SettingsLocalizationPage],
      providers: [
        NgControl,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.captchaSiteKey },
        { provide: ReCaptchaV3Service, useClass: ReCaptchaV3Service },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLocalizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
