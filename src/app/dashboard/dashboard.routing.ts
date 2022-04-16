import { Routes, RouterModule } from '@angular/router';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';
import { EditWorkspacePage } from './pages/edit-workspace/edit-workspace.page';
import { WorkspacesListPage } from './pages/workspaces-list/workspaces-list.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WorkspacesListPage,
  },
  {
    path: 'workspaces',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: WorkspacesListPage,
      },
      {
        path: 'create',
        component: CreateWorkspacePage,
      },
      {
        path: ':id',
        children: [
          {
            path: 'edit',
            component: EditWorkspacePage,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'edit',
          },
        ],
      },
    ],
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
