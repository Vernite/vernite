import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReleaseProgressBarComponent } from './components/release-progress-bar/release-progress-bar.component';
import { MainModule } from '../_main/_main.module';
import { ReleasesRoutingModule } from './releases.routing';
import { ReleasesListPage } from './pages/releases-list/releases-list.page';
import { ReleaseDialog } from './dialog/release/release.dialog';

@NgModule({
  imports: [MainModule, CommonModule, ReleasesRoutingModule],
  declarations: [ReleaseProgressBarComponent, ReleasesListPage, ReleaseDialog],
  exports: [],
})
export class ReleasesModule {}
