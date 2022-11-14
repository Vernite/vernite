import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Meetings routes list
 */
const routes: Routes = [
  {
    path: '',
    // List of meetings
  },
  {
    path: ':meetingId',
    // Meetings details
  },
];

/**
 * Meetings routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingRoutingModule {}
