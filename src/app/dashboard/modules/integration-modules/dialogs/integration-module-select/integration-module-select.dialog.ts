import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IntegrationModuleService } from '@dashboard/modules/integration-modules/services/integration-module/integration-module.service';
import { IntegrationModuleEntry } from '@main/interfaces/integration-module.interface';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

export interface IntegrationModuleSelectDialogData {
  modules: IntegrationModuleEntry[];
}

@Component({
  templateUrl: './integration-module-select.dialog.html',
})
export class IntegrationModuleSelectDialog implements OnInit {
  public modules$ = this.integrationModuleService.registry$;
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

  close() {
    const modulesMap = new Map(this.modules$.value.map((m) => [m.id, m]));

    this.dialogRef.close(
      Object.entries(this.form.value)
        .filter(([_, state]) => state)
        .map(([moduleId]) => modulesMap.get(moduleId)),
    );
  }
}
