import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Emails routes list
 */
const routes: Routes = [{}];

/**
 * Emails routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailsRoutingModule {}
