import { NgModule } from '@angular/core';
import { ReleaseProgressBarComponent } from './components/release-progress-bar/release-progress-bar.component';
import { MainModule } from '../_main/_main.module';

@NgModule({
  imports: [MainModule],
  declarations: [ReleaseProgressBarComponent],
  exports: [],
})
export class ReleaseModule {}
