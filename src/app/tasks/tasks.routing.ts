import { Routes, RouterModule } from '@angular/router';
import { BoardPage } from './pages/board/board.page';

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
];

/**
 * Tasks routes module
 */
export const TasksRoutes = RouterModule.forChild(routes);
