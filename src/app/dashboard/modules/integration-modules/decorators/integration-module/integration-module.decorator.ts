import { IntegrationModuleEntryConfig } from '@main/interfaces/integration-module.interface';
import { uniqueId } from 'lodash-es';
import { IntegrationModuleService } from '../../services/integration-module/integration-module.service';

export function IntegrationModule(config: IntegrationModuleEntryConfig) {
  return function decorator(target: any) {
    IntegrationModuleService.register({
      ...config,
      id: uniqueId(),
      component: target,
    });
  };
}
