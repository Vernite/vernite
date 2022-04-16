import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Page } from 'src/app/_main/decorators/page.decorator';
import { emailValidator } from 'src/app/_main/validators/email.validator';
import { requiredValidator } from 'src/app/_main/validators/required.validator';
import { WorkspaceService } from '../../services/workspace.service';

@Page()
@Component({
  selector: 'app-create-workspace-page',
  templateUrl: './create-workspace.page.html',
  styleUrls: ['./create-workspace.page.scss'],
})
export class CreateWorkspacePage {
  public form = new FormGroup({
    name: new FormControl('', [requiredValidator()], []),
  });
  public createSubscription?: Subscription;

  constructor(private workspaceService: WorkspaceService, private router: Router) {}

  public submitCreate() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    this.createSubscription = this.workspaceService.create(this.form.value).subscribe(() => {
      this.router.navigate(['/workspaces']);
    });
  }
}
