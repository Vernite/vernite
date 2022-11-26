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
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'board',
        component: BacklogPage,
      },
      {
        path: 'list',
        component: BacklogPage,
      },
    ],
  },
  {
    path: 'sprint',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'board',
        component: SprintPage,
      },
      {
        path: 'list',
        component: SprintPage,
      },
      {
        path: ':sprintId',
        component: SprintPage,
        children: [
          {
            path: 'board',
            component: SprintPage,
          },
          {
            path: 'list',
            component: SprintPage,
          },
        ],
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
];

/**
 * Tasks routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
