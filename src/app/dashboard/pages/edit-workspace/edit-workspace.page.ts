import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { Workspace } from '../../interfaces/workspace.interface';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-edit-workspace-page',
  templateUrl: './edit-workspace.page.html',
  styleUrls: ['./edit-workspace.page.scss'],
})
export class EditWorkspacePage implements OnDestroy {
  public form = new FormGroup({
    name: new FormControl('', [requiredValidator()], []),
    id: new FormControl(-1),
  });

  public updateSubscription?: Subscription;
  private getSubscription?: Subscription;

  constructor(
    private workspaceService: WorkspaceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const { id } = this.activatedRoute.snapshot.params;

    this.loadWorkspace(id);
  }

  public loadWorkspace(id: number) {
    this.getSubscription = this.workspaceService.get(id).subscribe((workspace) => {
      this.form.patchValue(workspace);
    });
  }

  public submitUpdate() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    this.updateSubscription = this.workspaceService.update(this.form.value).subscribe(() => {
      this.router.navigate(['/workspaces']);
    });
  }

  ngOnDestroy(): void {
    if (this.getSubscription) this.getSubscription.unsubscribe();
    if (this.updateSubscription) this.updateSubscription.unsubscribe();
  }
}
