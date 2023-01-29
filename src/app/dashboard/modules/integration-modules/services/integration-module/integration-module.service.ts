import { Injectable, Type } from '@angular/core';
import { Service } from '@main/decorators/service/service.decorator';
import { IntegrationModuleEntry } from '@main/interfaces/integration-module.interface';
import { BehaviorSubject } from 'rxjs';
import { DialogService } from '@main/services/dialog/dialog.service';
import { IntegrationModuleSelectDialog } from '@dashboard/modules/integration-modules/dialogs/integration-module-select/integration-module-select.dialog';
import { IntegrationModuleSelectDialogData } from './../../dialogs/integration-module-select/integration-module-select.dialog';
import { IntegrationGitHubComponent } from '../../components/integration-github/integration-github.component';
import { environment } from '../../../../../../environments/environment';
import { IntegrationComponent } from '../../interfaces/integration-component.interface';

/**
 * Integration module service (to manage integration modules in project integrations list)
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class IntegrationModuleService {
  /** List of integration components */
  public static readonly integrationComponents: Type<IntegrationComponent>[] = [
    IntegrationGitHubComponent,
  ];

  /** Registry of integration modules */
  public static readonly registry$ = new BehaviorSubject<IntegrationModuleEntry[]>([]);

  /** Registry of integration modules */
  public get registry$() {
    return IntegrationModuleService.registry$;
  }

  constructor(private dialogService: DialogService) {
    IntegrationModuleService.integrationComponents.forEach((component) => {
      IntegrationModuleService.register((component as any).metadata);
    });
  }

  /**
   * Register integration module
   * @param entry Integration module entry
   */
  public static register(entry: IntegrationModuleEntry) {
    const _regVal = this.registry$.value;
    _regVal.push(entry);
    this.registry$.next(_regVal);

    if (!environment.disableIntegrationRegistryCheck) {
      if (!IntegrationModuleService.integrationComponents.includes(entry.component)) {
        console.error(entry.component.name, 'is not registered in IntegrationModulesModule');
      }
    }
  }

  /**
   * Unregister integration module (remove from registry)
   * @param entry Integration module entry
   */
  public static unregister(entry: IntegrationModuleEntry) {
    const _regVal = this.registry$.value;
    this.registry$.next(_regVal.filter(({ id }) => id !== entry.id));
  }

  /**
   * Open integration module select dialog
   * @param data Data to pass to integration module select dialog
   * @returns dialog reference
   */
  public openIntegrationModuleSelectDialog(data: IntegrationModuleSelectDialogData) {
    return this.dialogService.open(IntegrationModuleSelectDialog, data);
  }
}
