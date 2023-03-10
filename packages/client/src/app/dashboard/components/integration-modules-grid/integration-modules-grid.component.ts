import {
  Component,
  ComponentRef,
  Input,
  ViewChild,
  ViewContainerRef,
  OnInit,
  AfterViewInit,
  Injector,
} from '@angular/core';
import { Project } from '@dashboard/interfaces/project.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IntegrationModuleService } from '@dashboard/modules/integration-modules/services/integration-module/integration-module.service';
import { IntegrationModuleEntry } from '@main/interfaces/integration-module.interface';
import { IntegrationComponent } from '@dashboard/modules/integration-modules/interfaces/integration-component.interface';
import { defaultIfEmpty, forkJoin, of, switchMap } from 'rxjs';

/**
 * Integration modules grid component
 */
@Component({
  selector: 'integration-modules-grid',
  templateUrl: './integration-modules-grid.component.html',
  styleUrls: ['./integration-modules-grid.component.scss'],
})
export class IntegrationModulesGridComponent implements OnInit, AfterViewInit {
  /**
   * Project to edit
   * @TODO Move to ngOnChanges
   */
  @Input() set project(project: Project | undefined) {
    this._project = project;
    for (const module of this.selectedModules.values()) {
      module.instance.project = project;
    }
  }
  get project(): Project | undefined {
    return this._project;
  }
  /** Project to edit */
  private _project?: Project;

  /** Grid element reference */
  @ViewChild('grid', { read: ViewContainerRef }) grid!: ViewContainerRef;

  /** Map of selected integration modules */
  public selectedModules = new Map<string, ComponentRef<IntegrationComponent>>();

  /** List of integrated modules */
  public integratedModules: IntegrationModuleEntry[] = [];

  /** List of modules to integrate */
  public modulesToIntegrate: IntegrationModuleEntry[] = [];

  /** @ignore */
  faPlus = faPlus;

  constructor(
    private integrationModuleService: IntegrationModuleService,
    private injector: Injector,
  ) {}

  ngOnInit() {
    const modules = this.integrationModuleService.registry$.value;
    const integratedModules = [];

    for (const module of modules) {
      if (this.project && module.isAttached(this.project, this.injector)) {
        integratedModules.push(module);
      }
    }

    this.integratedModules = integratedModules;
    this.modulesToIntegrate = [...integratedModules];
  }

  ngAfterViewInit() {
    this.createModuleComponents(this.integratedModules);
  }

  /** Open integration module select dialog */
  openIntegrationModuleSelectDialog() {
    this.integrationModuleService
      .openIntegrationModuleSelectDialog({
        modules: this.modulesToIntegrate,
      })
      .afterClosed()
      .subscribe((res) => {
        if (!res) return;

        this.modulesToIntegrate = res;
        this.createModuleComponents(res);
      });
  }

  /**
   * Create integration module components
   * @param modules List of modules to create
   */
  createModuleComponents(modules: IntegrationModuleEntry[]) {
    // Add all new selected integration modules
    for (const module of modules) {
      if (!this.selectedModules.has(module.id)) {
        const componentRef = this.grid.createComponent<IntegrationComponent>(module.component);
        componentRef.instance.project = this.project;
        this.selectedModules.set(module.id, componentRef);
      }
    }

    // Remove deselected integration modules from view
    const selectedIds = modules.map((m) => m.id);
    for (const [moduleId, componentRef] of this.selectedModules.entries()) {
      if (!selectedIds.includes(moduleId)) {
        componentRef.destroy();
        this.selectedModules.delete(moduleId);
      }
    }
  }

  /**
   * Save all integration modules
   */
  saveAll() {
    const modules = [...this.selectedModules.values()];
    const modulesToDetach = this.integratedModules.filter((m) => !this.selectedModules.has(m.id));

    return forkJoin([
      ...modules.map((module: ComponentRef<IntegrationComponent>) => module.instance.save()),
      ...modulesToDetach.map((module: IntegrationModuleEntry) =>
        module.detach(this.project as Project, this.injector),
      ),
    ]).pipe(
      defaultIfEmpty([]),
      switchMap(() => of(this.project as Project)),
    );
  }
}
