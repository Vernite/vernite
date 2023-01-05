import { IntegrationModuleEntryConfig } from '@main/interfaces/integration-module.interface';
import { uniqueId } from 'lodash-es';
import { Type } from '@angular/core';
import { IntegrationComponent } from '../../interfaces/integration-component.interface';

/**
 * Integration module decorator to mask component as Integration module
 * @param config Integration module configuration object
 * @returns Component as integration module
 */
export function IntegrationModule(config: IntegrationModuleEntryConfig) {
  return function decorator(target: Type<IntegrationComponent>) {
    (target as any).metadata = {
      ...config,
      id: uniqueId(),
      component: target,
    };
  };
}
