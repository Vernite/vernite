import { Injector, Type } from '@angular/core';
import { Project } from '@dashboard/interfaces/project.interface';
import { IntegrationComponent } from '@dashboard/modules/integration-modules/interfaces/integration-component.interface';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Observable } from 'rxjs';

export interface IntegrationModuleEntryConfig {
  title: string;
  description: string;
  icon: string | IconDefinition;
  isAttached(project: Project, injector: Injector): boolean;
  detach(project: Project, injector: Injector): Observable<boolean>;
}

export interface IntegrationModuleEntry extends IntegrationModuleEntryConfig {
  id: string;
  component: Type<IntegrationComponent>;
}
