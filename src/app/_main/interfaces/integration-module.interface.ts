import { Injector, Type } from '@angular/core';
import { Project } from '@dashboard/interfaces/project.interface';
import { IntegrationComponent } from '@dashboard/modules/integration-modules/interfaces/integration-component.interface';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Observable } from 'rxjs';

/**
 * Integration module configuration object
 */
export interface IntegrationModuleEntryConfig {
  /** Integration module title */
  title: string;
  /** Integration module description */
  description: string;
  /** Integration module icon */
  icon: string | IconDefinition;
  /** Check if integration module is attached to project */
  isAttached(project: Project, injector: Injector): boolean;
  /** Detach integration module from project */
  detach(project: Project, injector: Injector): Observable<boolean>;
}

/** Integration module registry entry */
export interface IntegrationModuleEntry extends IntegrationModuleEntryConfig {
  /** Integration module id */
  id: string;
  /** Integration module component */
  component: Type<IntegrationComponent>;
}
