import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { MainModule } from './_main/_main.module';

@NgModule({
  declarations: [AppComponent, LandingPageComponent],
  imports: [AppRoutingModule, BrowserAnimationsModule, MainModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
