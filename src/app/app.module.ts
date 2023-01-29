import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LandingPagePage } from './landing-page/pages/landing-page/landing-page.page';
import { MainModule } from './_main/_main.module';
import { environment } from '../environments/environment';
import { LandingPageNavComponent } from './landing-page/components/landing-page-nav/landing-page-nav.component';
import { LandingPageDocsPage } from './landing-page/pages/landing-page-docs/landing-page-docs.page';
import { LandingPageChangelogPage } from './landing-page/pages/landing-page-changelog/landing-page-changelog.page';
import { LandingPageCarouselComponent } from './landing-page/components/landing-page-carousel/landing-page-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPagePage,
    LandingPageDocsPage,
    LandingPageChangelogPage,
    LandingPageNavComponent,
    LandingPageCarouselComponent,
  ],
  imports: [AppRoutingModule, BrowserAnimationsModule, MainModule],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.captchaSiteKey },
    { provide: ReCaptchaV3Service, useClass: ReCaptchaV3Service },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
