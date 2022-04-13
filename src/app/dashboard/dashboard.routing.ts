import { Routes, RouterModule } from '@angular/router';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';

const routes: Routes = [
  {
    path: '',
    component: CreateWorkspacePage,
  },
  {
    path: 'workspaces',
    component: CreateWorkspacePage,
    children: [
      {
        path: 'create',
        component: CreateWorkspacePage,
      },
      {
        path: 'edit',
        component: CreateWorkspacePage,
      },
    ],
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
