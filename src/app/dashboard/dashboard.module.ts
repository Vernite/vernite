import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routing';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';
import { MainModule } from '../_main/_main.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkspacesListPage } from './pages/workspaces-list/workspaces-list.page';
import { EditWorkspacePage } from './pages/edit-workspace/edit-workspace.page';

@NgModule({
  imports: [CommonModule, MainModule, ReactiveFormsModule, DashboardRoutes],
  declarations: [CreateWorkspacePage, WorkspacesListPage, EditWorkspacePage],
})
export class DashboardModule {}
