import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsAccountPage } from './pages/settings-account/settings-account.page';
import { SettingsIntegrationsPage } from './pages/settings-integrations/settings-integrations.page';
import { SettingsLocalizationPage } from './pages/settings-localization/settings-localization.page';
import { SettingsSessionsPage } from './pages/settings-sessions/settings-sessions.page';
import { SettingsPage } from './pages/settings/settings.page';

/**
 * Messages routes list
 */
const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    children: [
      {
        path: 'account',
        component: SettingsAccountPage,
      },
      {
        path: 'localization',
        component: SettingsLocalizationPage,
      },
      {
        path: 'integrations',
        component: SettingsIntegrationsPage,
      },
      {
        path: 'sessions',
        component: SettingsSessionsPage,
      },
    ],
  },
];

/**
 * Messages routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
