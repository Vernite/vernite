import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GitIssue } from '@dashboard/interfaces/git-integration.interface';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { GitIntegrationService } from '@dashboard/services/git-integration.service';
import { NgControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'input-issue',
  templateUrl: './input-issue.component.html',
})
export class InputIssueComponent extends ControlAccessor<GitIssue | 'DETACH' | 'CREATE' | null> {
  @Input() set projectId(value: number) {
    this._projectId = value;
    if (value) {
      this.loadIssues();
    }
  }

  get projectId() {
    return this._projectId;
  }

  set isOpen(value: boolean) {
    if (value) this.control.setValue('CREATE');
    else this.control.setValue('DETACH');
  }

  get isOpen() {
    return !['DETACH', null].includes(this.control.value as string);
  }

  private _projectId: number = 0;

  issues$: Observable<GitIssue[]> = of([]);

  constructor(
    ngControl: NgControl,
    private gitIntegrationService: GitIntegrationService,
    cdRef: ChangeDetectorRef,
  ) {
    super(ngControl, cdRef);
  }

  loadIssues() {
    const { projectId } = this;
    this.issues$ = this.gitIntegrationService.gitHubIssueList(projectId);
  }
}
