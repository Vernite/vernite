import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPage } from './pages/board/board.page';
import { SchedulePage } from './pages/schedule/schedule.page';
import { TaskListPage } from './pages/task-list/task-list.page';

/**
 * Tasks routes list
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'board',
  },
  {
    path: 'board',
    component: BoardPage,
  },
  {
    path: 'list',
    component: TaskListPage,
  },
  {
    path: 'schedule',
    component: SchedulePage,
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
