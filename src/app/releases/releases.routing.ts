import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleasePage } from './pages/release.page/release.page';
import { ReleasesListPage } from './pages/releases-list/releases-list.page';

/**
 * Tasks routes list
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ReleasesListPage,
  },
  {
    path: ':releaseId',
    component: ReleasePage,
  },
];

/**
 * Releases routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleasesRoutingModule {}
