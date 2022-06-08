import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectMembersPage } from './pages/create-project-members/create-project-members.page';
import { CreateProjectPage } from './pages/create-project/create-project.page';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';
import { EditProjectMembersPage } from './pages/edit-project-members/edit-project-members.page';
import { EditProjectPage } from './pages/edit-project/edit-project.page';
import { EditWorkspacePage } from './pages/edit-workspace/edit-workspace.page';
import { GithubIntegrationPage } from './pages/github-integration/github-integration.page';
import { ProjectsListPage } from './pages/projects-list/projects-list.page';
import { WorkspacesListPage } from './pages/workspaces-list/workspaces-list.page';

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
    path: 'settings',
    loadChildren: () => import('../settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'github',
    component: GithubIntegrationPage,
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
        redirectTo: 'create/general',
      },
      {
        path: 'create/general',
        component: CreateProjectPage,
      },
      {
        path: 'create/members',
        component: CreateProjectMembersPage,
      },
      {
        path: ':projectId/edit',
        redirectTo: ':projectId/edit/general',
      },
      {
        path: ':projectId/edit/general',
        component: EditProjectPage,
      },
      {
        path: ':projectId/edit/members',
        component: EditProjectMembersPage,
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
