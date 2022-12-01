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

@Service()
@Injectable({
  providedIn: 'root',
})
export class IntegrationModuleService {
  public static readonly integrationComponents: Type<IntegrationComponent>[] = [
    IntegrationGitHubComponent,
  ];

  public static readonly registry$ = new BehaviorSubject<IntegrationModuleEntry[]>([]);

  public get registry$() {
    return IntegrationModuleService.registry$;
  }

  constructor(private dialogService: DialogService) {
    IntegrationModuleService.integrationComponents.forEach((component) => {
      IntegrationModuleService.register((component as any).metadata);
    });
  }

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

  public static unregister(entry: IntegrationModuleEntry) {
    const _regVal = this.registry$.value;
    this.registry$.next(_regVal.filter(({ id }) => id !== entry.id));
  }

  public openIntegrationModuleSelectDialog(data: IntegrationModuleSelectDialogData) {
    return this.dialogService.open(IntegrationModuleSelectDialog, data);
  }
}
