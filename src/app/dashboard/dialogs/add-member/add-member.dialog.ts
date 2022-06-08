import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { GitIntegrationService } from '@dashboard/services/git-integration.service';
import { WorkspaceService } from '@dashboard/services/workspace.service';
import { RouterExtensionsService } from '@main/services/router-extensions.service';
import { Status } from '@tasks/interfaces/status.interface';
import { StatusService } from '@tasks/services/status.service';
import { Observable } from 'rxjs';
import { requiredValidator } from '../../../_main/validators/required.validator';

export interface AddMemberDialogData {
  workspaceId: number;
  projectId?: number;
}

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member.dialog.html',
  styleUrls: ['./add-member.dialog.scss'],
})
export class AddMemberDialog implements OnInit {
  public statusList$!: Observable<Status[]>;
  public workspaceList$!: Observable<Workspace[]>;

  public form = new FormGroup({
    email: new FormControl('', [requiredValidator()]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddMemberDialogData,
    private dialogRef: MatDialogRef<AddMemberDialog>,
    private statusService: StatusService,
    private workspaceService: WorkspaceService,
    private gitIntegrationService: GitIntegrationService,
    private routerExtensions: RouterExtensionsService,
  ) {}

  ngOnInit() {
    this.loadParamsFromUrl();

    const { workspaceId, projectId } = this.data;
    this.form.patchValue({ workspaceId, projectId });
  }

  loadParamsFromUrl() {
    const { workspaceId, projectId } = this.routerExtensions.snapshot.params;
    this.data.workspaceId = this.data.workspaceId || Number(workspaceId);
    this.data.projectId = this.data.projectId || Number(projectId);
  }

  addMembers() {
    const formValues = this.form.value;

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    this.dialogRef.close([formValues]);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
