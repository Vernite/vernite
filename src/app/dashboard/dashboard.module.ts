import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routing';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';

@NgModule({
  imports: [CommonModule, DashboardRoutes],
  declarations: [CreateWorkspacePage],
})
export class DashboardModule {}
