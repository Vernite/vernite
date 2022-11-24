import { IntegrationModuleEntryConfig } from '@main/interfaces/integration-module.interface';
import { uniqueId } from 'lodash-es';
import { IntegrationComponent } from '../../../../../../../dist/out-tsc/src/app/dashboard/modules/integration-modules/interfaces/integration-component.interface';
import { Type } from '@angular/core';

export function IntegrationModule(config: IntegrationModuleEntryConfig) {
  return function decorator(target: Type<IntegrationComponent>) {
    (target as any).metadata = {
      ...config,
      id: uniqueId(),
      component: target,
    };
  };
}
