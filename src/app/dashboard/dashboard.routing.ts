import { Routes, RouterModule } from '@angular/router';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';
import { EditWorkspacePage } from './pages/edit-workspace/edit-workspace.page';
import { WorkspacesListPage } from './pages/workspaces-list/workspaces-list.page';
import { ProjectsListPage } from './pages/projects-list/projects-list.page';
import { CreateProjectPage } from './pages/create-project/create-project.page';
import { EditProjectPage } from './pages/edit-project/edit-project.page';
import { NgModule } from '@angular/core';

/**
 * Dashboard routes list
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WorkspacesListPage,
  },
  {
    path: 'dashboard',
    redirectTo: '',
  },
  {
    path: 'create',
    component: CreateWorkspacePage,
  },
  {
    path: ':workspaceId',
    children: [
      {
        path: 'edit',
        component: EditWorkspacePage,
      },
      {
        path: '',
        pathMatch: 'full',
        component: ProjectsListPage,
      },
      {
        path: 'create',
        component: CreateProjectPage,
      },
      {
        path: ':projectId/edit',
        component: EditProjectPage,
      },
      {
        path: ':projectId',
        loadChildren: () => import('../tasks/tasks.module').then((m) => m.TasksModule),
      },
    ],
  },
];

/**
 * Dashboard routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
