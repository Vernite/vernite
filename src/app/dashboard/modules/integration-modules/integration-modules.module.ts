import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MainModule } from '@main/_main.module';
import { IntegrationGitHubComponent } from './components/integration-github/integration-github.component';
import { SelectableIntegrationComponent } from './components/selectable-integration/selectable-integration.component';
import { IntegrationModuleSelectDialog } from './dialogs/integration-module-select/integration-module-select.dialog';
import { IntegrationComponent } from '../../../../../dist/out-tsc/src/app/dashboard/modules/integration-modules/interfaces/integration-component.interface';

@NgModule({
  imports: [MainModule, CommonModule],
  declarations: [
    SelectableIntegrationComponent,
    IntegrationGitHubComponent,
    IntegrationModuleSelectDialog,
  ],
})
export class IntegrationModulesModule {
  public static readonly integrationComponents: Type<IntegrationComponent>[] = [
    IntegrationGitHubComponent,
  ];
}
