import { Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { TestNgControl } from '@tests/helpers/ng-control-testing-provider.helper';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-input-assignee',
  templateUrl: './input-assignee.component.html',
  styleUrls: ['./input-assignee.component.scss'],
  providers: [{ provide: NgControl, useClass: TestNgControl }],
})
export class InputAssigneeComponent extends ControlAccessor {
  @Input() assignee?: ProjectMember;
  @Input() set members(members: Map<number, ProjectMember> | ProjectMember[]) {
    if (Array.isArray(members)) {
      this.members$.next(members);
    } else if (members) {
      this.members$.next([...members.values()]);
    }
  }
  @Input() taskId?: number;

  public members$ = new BehaviorSubject<ProjectMember[]>([]);
  public readonly isOpen$ = new BehaviorSubject<boolean>(false);

  public set isOpen(val: boolean) {
    this.isOpen$.next(val);
  }

  public get isOpen() {
    return this.isOpen$.value;
  }

  constructor(public override ngControl: NgControl) {
    super(ngControl);
  }

  public open() {
    this.isOpen$.next(true);
  }

  public close() {
    this.isOpen$.next(false);
  }

  public toggle() {
    if (this.isOpen) {
      return this.close();
    }
    return this.open();
  }
}
