import { ControlAccessor } from '@main/classes/control-accessor.class';
import { GitPull } from '@dashboard/interfaces/git-integration.interface';
import { Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { GitIntegrationService } from '@dashboard/services/git-integration.service';

@Component({
  selector: 'input-pull-request',
  templateUrl: './input-pull-request.component.html',
})
export class InputPullRequestComponent extends ControlAccessor<
  GitPull | 'DETACH' | 'CREATE' | null
> {
  @Input() set projectId(value: number) {
    this._projectId = value;
    if (value) {
      this.loadPullRequests();
    }
  }

  get projectId() {
    return this._projectId;
  }

  set isOpen(value: boolean) {
    if (value) this.control.setValue(null);
    else this.control.setValue('DETACH');
  }

  get isOpen() {
    return !['DETACH', null].includes(this.control.value);
  }

  private _projectId: number = 0;

  pulls$: Observable<GitPull[]> = of([]);

  constructor(ngControl: NgControl, private gitIntegrationService: GitIntegrationService) {
    super(ngControl);
  }

  loadPullRequests() {
    const { projectId } = this;
    this.pulls$ = this.gitIntegrationService.gitHubPullList(projectId);
  }
}
