import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '../_main/_main.module';
import { IntegrationGithubComponent } from './components/integration-github/integration-github.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { ViewOptionsComponent } from './components/view-options/view-options.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { AddMemberDialog } from './dialogs/add-member/add-member.dialog';
import { CreateProjectMembersPage } from './pages/create-project-members/create-project-members.page';
import { CreateProjectPage } from './pages/create-project/create-project.page';
import { CreateWorkspacePage } from './pages/create-workspace/create-workspace.page';
import { EditProjectMembersPage } from './pages/edit-project-members/edit-project-members.page';
import { EditProjectPage } from './pages/edit-project/edit-project.page';
import { EditWorkspacePage } from './pages/edit-workspace/edit-workspace.page';
import { ProjectsListPage } from './pages/projects-list/projects-list.page';
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
    CreateProjectMembersPage,
    EditProjectMembersPage,
    IntegrationGithubComponent,
    ViewOptionsComponent,
    MemberListComponent,
    AddMemberDialog,
  ],
  providers: [GitIntegrationService],
})
export class DashboardModule {}
