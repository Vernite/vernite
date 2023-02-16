import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '@main/_main.module';
import { IntegrationEntryComponent } from './components/integration-entry/integration-entry.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ChangePasswordDialog } from './dialog/change-password/change-password.dialog';
import { SettingsAccountPage } from './pages/settings-account/settings-account.page';
import { SettingsIntegrationsPage } from './pages/settings-integrations/settings-integrations.page';
import { SettingsLocalizationPage } from './pages/settings-localization/settings-localization.page';
import { SettingsSessionsPage } from './pages/settings-sessions/settings-sessions.page';
import { SettingsPage } from './pages/settings/settings.page';
import { SettingsRoutingModule } from './settings.routing';

@NgModule({
  imports: [CommonModule, MainModule, ReactiveFormsModule, SettingsRoutingModule],
  declarations: [
    SettingsPage,
    SettingsLocalizationPage,
    SettingsAccountPage,
    SettingsIntegrationsPage,
    SettingsSessionsPage,
    ListGroupComponent,
    IntegrationEntryComponent,
    ChangePasswordDialog,
  ],
})
export class SettingsModule {}
