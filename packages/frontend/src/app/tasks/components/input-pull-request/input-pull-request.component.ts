import { ControlAccessor } from '@main/classes/control-accessor/control-accessor.class';
import { GitPull } from '@dashboard/interfaces/git-integration.interface';
import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { GitIntegrationService } from '@dashboard/services/git-integration/git-integration.service';
import { ValidationError } from '@main/interfaces/validation-error.interface';
import { requiredValidator } from '@main/validators/required.validator';

@Component({
  selector: 'input-pull-request',
  templateUrl: './input-pull-request.component.html',
})
export class InputPullRequestComponent
  extends ControlAccessor<GitPull | 'DETACH' | 'CREATE' | null | ''>
  implements OnDestroy
{
  @Input() set projectId(value: number | null) {
    this._projectId = value;
    if (value) {
      this.loadPullRequests();
    }
  }

  get projectId() {
    return this._projectId;
  }

  set isOpen(value: boolean) {
    if (value) this.control.setValue('');
    else this.control.setValue('DETACH');
  }

  get isOpen() {
    return !['DETACH', null].includes(this.control.value as string);
  }

  private _projectId: number | null = null;

  pulls$: Observable<GitPull[]> = of([]);

  constructor(
    ngControl: NgControl,
    private gitIntegrationService: GitIntegrationService,
    cdRef: ChangeDetectorRef,
  ) {
    super(ngControl, cdRef);
  }

  loadPullRequests() {
    const { projectId } = this;
    this.pulls$ = this.gitIntegrationService.gitHubPullList(projectId!);
  }

  override validate(control: AbstractControl): ValidationError | null {
    if (this.isOpen && !this.control.value) return requiredValidator()(control) as ValidationError;
    return null;
  }

  override ngAfterControlInit(): void {
    this.cdRef.detectChanges();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.control.setValue(null);
  }
}
