/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

describe('Service: AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthService,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.captchaSiteKey },
        { provide: ReCaptchaV3Service, useClass: ReCaptchaV3Service },
      ],
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
