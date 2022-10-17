import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '@dashboard/interfaces/project.interface';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { WorkspaceService } from '@dashboard/services/workspace/workspace.service';
import { validateForm } from '@main/classes/form.class';
import { timeToInteraction } from '@main/classes/time-to-interaction.class';
import { RouterExtensionsService } from '@main/services/router-extensions/router-extensions.service';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isNil } from 'lodash-es';
import { map, Observable, pairwise } from 'rxjs';
import { requiredValidator } from '../../../_main/validators/required.validator';
import { unixTimestamp } from '../../../_main/interfaces/date.interface';
import { Sprint } from '@tasks/interfaces/sprint.interface';

export enum SprintDialogVariant {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface SprintDialogData {
  workspaceId?: number;
  projectId?: number;
  variant: SprintDialogVariant;
  sprint?: Partial<Sprint>;
}

@UntilDestroy()
@Component({
  selector: 'sprint-dialog',
  templateUrl: './sprint.dialog.html',
  styleUrls: ['./sprint.dialog.scss'],
})
export class SprintDialog implements OnInit {
  SprintDialogVariant = SprintDialogVariant;

  public workspaceList$!: Observable<Workspace[]>;
  public projectList$!: Observable<Project[]>;

  public form = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', [requiredValidator()]),
    projectId: new FormControl<number | null>(null, [requiredValidator()]),
    workspaceId: new FormControl<number | null>(null, [requiredValidator()]),
    description: new FormControl<string>(''),
    startDate: new FormControl<unixTimestamp | null>(null),
    finishDate: new FormControl<unixTimestamp | null>(null),
  });

  public interactive$ = timeToInteraction();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SprintDialogData,
    private dialogRef: MatDialogRef<SprintDialog>,
    private workspaceService: WorkspaceService,
    private routerExtensions: RouterExtensionsService,
  ) {}

  ngOnInit() {
    this.loadParamsFromUrl();

    const { workspaceId, projectId, sprint } = this.data;
    this.form.patchValue({ workspaceId, projectId });
    if (sprint) {
      this.form.patchValue(sprint);
    }

    this.workspaceList$ = this.workspaceService.list();

    this.form
      .get('workspaceId')
      .valueChanges.pipe(pairwise(), untilDestroyed(this))
      .subscribe(([oldWorkspaceId, newWorkspaceId]) => {
        if (oldWorkspaceId !== newWorkspaceId) {
          this.onWorkspaceIdChange.bind(this)(newWorkspaceId);
        }
      });

    if (workspaceId) {
      this.onWorkspaceIdChange(workspaceId);
    }
  }

  onWorkspaceIdChange(workspaceId: number | null) {
    if (this.interactive$.value) {
      this.form.get('projectId').setValue(null);
    }

    if (!workspaceId) return;

    this.projectList$ = this.workspaceService
      .get(workspaceId)
      .pipe(map((workspace) => workspace.projectsWithPrivileges.map((project) => project.project)));
  }

  loadParamsFromUrl() {
    const { workspaceId, projectId } = this.routerExtensions.snapshot.params;

    if (!isNil(workspaceId) && !this.data.workspaceId) this.data.workspaceId = Number(workspaceId);
    if (!isNil(projectId) && !this.data.projectId) this.data.projectId = Number(projectId);
  }

  confirm() {
    if (validateForm(this.form)) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
