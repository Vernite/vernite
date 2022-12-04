import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReleaseProgressBarComponent } from './components/release-progress-bar/release-progress-bar.component';
import { MainModule } from '../_main/_main.module';
import { ReleasesRoutingModule } from './releases.routing';
import { ReleasesListPage } from './pages/releases-list/releases-list.page';
import { ReleaseDialog } from './dialog/release/release.dialog';
import { ReleasePage } from './pages/release.page/release.page';
import { TasksModule } from '@tasks/tasks.module';

@NgModule({
  imports: [MainModule, CommonModule, ReleasesRoutingModule, TasksModule],
  declarations: [ReleaseProgressBarComponent, ReleasesListPage, ReleaseDialog, ReleasePage],
  exports: [],
})
export class ReleasesModule {}
