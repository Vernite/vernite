import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routing';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';
import { MainModule } from '../_main/_main.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MainModule, ReactiveFormsModule, DashboardRoutes],
  declarations: [CreateWorkspacePage],
})
export class DashboardModule {}
