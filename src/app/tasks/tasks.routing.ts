import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BacklogPage } from './pages/backlog/backlog.page';
import { SprintPage } from './pages/sprint/sprint.page';
import { TaskPage } from './pages/task/task.page';

/**
 * Tasks routes list
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sprint',
  },
  {
    path: 'backlog',
    component: BacklogPage,
  },
  {
    path: 'sprint',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SprintPage,
      },
      {
        path: ':sprintId',
        component: SprintPage,
      },
    ],
  },
  {
    path: 'tasks/:taskId',
    component: TaskPage,
  },
  {
    path: 'calendar',
    loadChildren: () => import('../calendar/calendar.module').then((m) => m.CalendarModule),
  },
  {
    path: 'releases',
    loadChildren: () => import('../releases/releases.module').then((m) => m.ReleasesModule),
  },
];

/**
 * Tasks routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
