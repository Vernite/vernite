import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '../_main/_main.module';
import { IntegrationModulesGridComponent } from './components/integration-modules-grid/integration-modules-grid.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { ProjectFormGeneralComponent } from './components/project-form-general/project-form-general.component';
import { ProjectFormIntegrationsComponent } from './components/project-form-integrations/project-form-integrations.component';
import { ProjectFormMembersComponent } from './components/project-form-members/project-form-members.component';
import { ProjectFormStatusesComponent } from './components/project-form-statuses/project-form-statuses.component';
import { ViewOptionsComponent } from './components/view-options/view-options.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { AddMemberDialog } from './dialogs/add-member/add-member.dialog';
import { StatusDialog } from './dialogs/status/status.dialog';
import { IntegrationModulesModule } from './modules/integration-modules/integration-modules.module';
import { CreateProjectPage } from './pages/create-project/create-project.page';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';
import { EditProjectPage } from './pages/edit-project/edit-project.page';
import { EditWorkspacePage } from './pages/edit-workspace/edit-workspace.page';
import { ProjectsListPage } from './pages/projects-list/projects-list.page';
import { WorkspacesListPage } from './pages/workspaces-list/workspaces-list.page';
import { GitIntegrationService } from './services/git-integration/git-integration.service';

@NgModule({
  imports: [
    CommonModule,
    MainModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    IntegrationModulesModule,
  ],
  declarations: [
    CreateWorkspacePage,
    WorkspacesListPage,
    EditWorkspacePage,
    ProjectsListPage,

    CreateProjectPage,
    ProjectFormGeneralComponent,
    ProjectFormIntegrationsComponent,
    ProjectFormMembersComponent,
    ProjectFormStatusesComponent,

    EditProjectPage,
    ViewOptionsComponent,
    MemberListComponent,
    AddMemberDialog,
    IntegrationModulesGridComponent,
    StatusDialog,
  ],
  providers: [GitIntegrationService],
})
export class DashboardModule {}
