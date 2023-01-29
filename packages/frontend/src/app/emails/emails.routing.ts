import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MockPage } from '@main/pages/mock/mock.page';

/**
 * Emails routes list
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MockPage,
    data: {
      image: 'assets/mocks/inbox.svg',
    },
  },
];

/**
 * Emails routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailsRoutingModule {}
