import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarPage } from './pages/calendar/calendar.page';
/**
 * Calendar routes list
 */
const routes: Routes = [
  {
    path: '',
    component: CalendarPage,
  },
];

/**
 * Calendar routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
