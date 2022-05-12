import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '../_main/_main.module';
import { IntegrationGithubComponent } from './components/integration-github/integration-github.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { CreateProjectPage } from './pages/create-project/create-project.page';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';
import { EditProjectPage } from './pages/edit-project/edit-project.page';
import { EditWorkspacePage } from './pages/edit-workspace/edit-workspace.page';
import { ProjectsListPage } from './pages/projects-list/projects-list.page';
import { SettingsAccountPage } from './pages/settings-account/settings-account.page';
import { SettingsLocalizationPage } from './pages/settings-localization/settings-localization.page';
import { SettingsPage } from './pages/settings/settings.page';
import { WorkspacesListPage } from './pages/workspaces-list/workspaces-list.page';
import { GitIntegrationService } from './services/git-integration.service';

@NgModule({
  imports: [CommonModule, MainModule, ReactiveFormsModule, DashboardRoutingModule],
  declarations: [
    CreateWorkspacePage,
    WorkspacesListPage,
    EditWorkspacePage,
    ProjectsListPage,
    CreateProjectPage,
    EditProjectPage,
    SettingsPage,
    SettingsAccountPage,
    SettingsLocalizationPage,
    IntegrationGithubComponent,
  ],
  providers: [GitIntegrationService],
})
export class DashboardModule {}
