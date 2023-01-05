import { Component, Input, ViewChild } from '@angular/core';
import { ProjectForm } from '@dashboard/interfaces/project-form.interface';
import { Project } from '@dashboard/interfaces/project.interface';
import { IntegrationModulesGridComponent } from '../integration-modules-grid/integration-modules-grid.component';

/**
 * Project form integrations component
 */
@Component({
  selector: 'project-form-integrations',
  templateUrl: './project-form-integrations.component.html',
})
export class ProjectFormIntegrationsComponent implements ProjectForm {
  /** Integrations grid element reference */
  @ViewChild(IntegrationModulesGridComponent)
  integrationModulesGrid!: IntegrationModulesGridComponent;

  /** Project to edit */
  @Input() project?: Project;

  public save() {
    return this.integrationModulesGrid.saveAll();
  }
}
