import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';
import { EditProjectPage } from './pages/edit-project/edit-project.page';
import { EditWorkspacePage } from './pages/edit-workspace/edit-workspace.page';
import { GithubIntegrationPage } from './pages/github-integration/github-integration.page';
import { ProjectsListPage } from './pages/projects-list/projects-list.page';
import { WorkspacesListPage } from './pages/workspaces-list/workspaces-list.page';
import { CreateProjectPage } from './pages/create-project/create-project.page';
import { ProjectPage } from './pages/project/project.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';

/**
 * Dashboard routes list
 */
const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () => import('../settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'github',
    component: GithubIntegrationPage,
    data: {
      hideNavigation: true,
    },
  },
  {
    path: 'dashboard',
    component: DashboardPage,
  },

  // Workspaces sub route
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
        path: ':workspaceId',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'projects',
          },
          {
            path: 'edit',
            component: EditWorkspacePage,
          },
          {
            path: 'projects',
            children: [
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
                path: ':projectId',
                redirectTo: '/projects/:projectId',
              },
            ],
          },
        ],
      },
    ],
  },

  // Projects sub route
  {
    path: 'projects',
    children: [
      {
        path: ':projectId',
        children: [
          {
            path: '',
            component: ProjectPage,
            loadChildren: () => import('../tasks/tasks.module').then((m) => m.TasksModule),
          },
          {
            path: 'edit',
            component: EditProjectPage,
          },
        ],
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
