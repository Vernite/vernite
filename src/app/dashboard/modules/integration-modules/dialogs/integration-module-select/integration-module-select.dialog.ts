import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IntegrationModuleService } from '@dashboard/modules/integration-modules/services/integration-module/integration-module.service';
import { IntegrationModuleEntry } from '@main/interfaces/integration-module.interface';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

/**
 * Integration module select dialog data
 */
export interface IntegrationModuleSelectDialogData {
  /** List of selected modules */
  modules: IntegrationModuleEntry[];
}

/**
 * Integration module select dialog component
 */
@Component({
  templateUrl: './integration-module-select.dialog.html',
})
export class IntegrationModuleSelectDialog implements OnInit {
  /** Available integration modules registry */
  public modules$ = this.integrationModuleService.registry$;

  /** Integration module select dialog form */
  public form = new FormGroup(
    Object.fromEntries(
      this.modules$.value.map((module) => [module.id, new FormControl<boolean>()]),
    ),
  );

  constructor(
    private integrationModuleService: IntegrationModuleService,
    private dialogRef: MatDialogRef<IntegrationModuleSelectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IntegrationModuleSelectDialogData,
  ) {}

  ngOnInit() {
    this.form.patchValue(Object.fromEntries(this.data.modules.map((module) => [module.id, true])));
  }

  /** Close dialog */
  close() {
    const modulesMap = new Map(this.modules$.value.map((m) => [m.id, m]));

    this.dialogRef.close(
      Object.entries(this.form.value)
        .filter(([_, state]) => state)
        .map(([moduleId]) => modulesMap.get(moduleId)),
    );
  }
}
