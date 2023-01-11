/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';

describe('Service: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule],
      providers: [
        UserService,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.captchaSiteKey },
        { provide: ReCaptchaV3Service, useClass: ReCaptchaV3Service },
      ],
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
