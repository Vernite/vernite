import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Messages routes list
 */
const routes: Routes = [{}];

/**
 * Messages routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
