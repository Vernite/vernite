/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { UpperNavigationComponent } from './upper-navigation.component';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../../../../environments/environment';
import { MatDialogTestingProvider } from './../../../../tests/helpers/mat-dialog-testing-provider.helper';

describe('UpperNavigationComponent', () => {
  let component: UpperNavigationComponent;
  let fixture: ComponentFixture<UpperNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule, RouterTestingModule],
      declarations: [UpperNavigationComponent],
      providers: [
        ...MatDialogTestingProvider,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.captchaSiteKey },
        { provide: ReCaptchaV3Service, useClass: ReCaptchaV3Service },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpperNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
