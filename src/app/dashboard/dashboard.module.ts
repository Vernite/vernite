import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksModule } from '@tasks/tasks.module';
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
import { WidgetContentComponent } from './modules/widgets/components/widget-content/widget-content.component';
import { WidgetHeaderComponent } from './modules/widgets/components/widget-header/widget-header.component';
import { CreateProjectPage } from './pages/create-project/create-project.page';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';
import { EditProjectPage } from './pages/edit-project/edit-project.page';
import { EditWorkspacePage } from './pages/edit-workspace/edit-workspace.page';
import { ProjectPage } from './pages/project/project.page';
import { ProjectsListPage } from './pages/projects-list/projects-list.page';
import { WorkspacesListPage } from './pages/workspaces-list/workspaces-list.page';
import { GitIntegrationService } from './services/git-integration/git-integration.service';
import { WidgetTasksComponent } from './modules/widgets/components/widget-tasks/widget-tasks.component';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { WidgetAuditLogComponent } from './modules/widgets/components/widget-audit-log/widget-audit-log.component';
import { AuditLogModule } from '../_main/modules/audit-log/audit-log.module';
import { GithubIntegrationPage } from './pages/github-integration/github-integration.page';

@NgModule({
  imports: [
    CommonModule,
    MainModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    IntegrationModulesModule,
    TasksModule,
    AuditLogModule,
  ],
  declarations: [
    CreateWorkspacePage,
    WorkspacesListPage,
    EditWorkspacePage,
    ProjectsListPage,
    ProjectPage,
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
    WidgetContentComponent,
    WidgetHeaderComponent,
    WidgetTasksComponent,
    WidgetAuditLogComponent,
    DashboardPage,
    GithubIntegrationPage,
  ],
  providers: [GitIntegrationService],
})
export class DashboardModule {}
