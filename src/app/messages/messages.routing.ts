import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MockPage } from '@main/pages/mock/mock.page';

/**
 * Messages routes list
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MockPage,
    data: {
      image: 'assets/mocks/messages.svg',
    },
  },
];

/**
 * Messages routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
