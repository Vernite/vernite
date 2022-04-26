import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Auth routes list
 */
const routes: Routes = [{}];

/**
 * Auth routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
