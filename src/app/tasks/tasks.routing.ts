import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveSprintGuard } from './guard/active-sprint.guward';
import { BacklogPage } from './pages/backlog/backlog.page';
import { BoardPage } from './pages/board/board.page';
import { SprintPage } from './pages/sprint/sprint.page';
import { TaskListPage } from './pages/task-list/task-list.page';
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
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'board',
        component: BoardPage,
      },
      {
        path: 'list',
        component: TaskListPage,
      },
    ],
  },
  {
    path: 'sprint',
    children: [
      {
        path: 'active',
        canActivate: [ActiveSprintGuard],
      },
      {
        path: ':sprintId',
        component: SprintPage,
        children: [
          {
            path: 'board',
            component: BoardPage,
          },
          {
            path: 'list',
            component: TaskListPage,
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
