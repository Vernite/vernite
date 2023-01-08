/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordPage } from './forgot-password.page';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonComponent } from '@main/components/button/button.component';
import { IconComponent } from '@main/components/icon/icon.component';
import { MainModule } from '@main/_main.module';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MainModule, BrowserAnimationsModule, ReactiveFormsModule],
      declarations: [ForgotPasswordPage, ButtonComponent, IconComponent],
      providers: [
        NgControl,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.captchaSiteKey },
        { provide: ReCaptchaV3Service, useClass: ReCaptchaV3Service },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
