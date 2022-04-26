import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';
import { MainModule } from '../_main/_main.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkspacesListPage } from './pages/workspaces-list/workspaces-list.page';
import { EditWorkspacePage } from './pages/edit-workspace/edit-workspace.page';
import { ProjectsListPage } from './pages/projects-list/projects-list.page';
import { CreateProjectPage } from './pages/create-project/create-project.page';
import { EditProjectPage } from './pages/edit-project/edit-project.page';

@NgModule({
  imports: [CommonModule, MainModule, ReactiveFormsModule, DashboardRoutingModule],
  declarations: [
    CreateWorkspacePage,
    WorkspacesListPage,
    EditWorkspacePage,
    ProjectsListPage,
    CreateProjectPage,
    EditProjectPage,
  ],
})
export class DashboardModule {}
