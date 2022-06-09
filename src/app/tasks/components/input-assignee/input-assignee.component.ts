import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { TaskService } from '@tasks/services/task.service';
import { TestNgControl } from '@tests/helpers/ng-control-testing-provider.helper';
import { BehaviorSubject, filter, fromEvent, take } from 'rxjs';

@Component({
  selector: 'app-input-assignee',
  templateUrl: './input-assignee.component.html',
  styleUrls: ['./input-assignee.component.scss'],
  providers: [{ provide: NgControl, useClass: TestNgControl }],
})
export class InputAssigneeComponent extends ControlAccessor {
  @Input() assignee?: ProjectMember | null;
  @Input() set members(members: Map<number, ProjectMember> | ProjectMember[]) {
    if (Array.isArray(members)) {
      this.members$.next(members);
    } else if (members) {
      this.members$.next([...members.values()]);
    }
  }
  @Input() taskId?: number;
  @Input() projectId?: number;

  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;

  public members$ = new BehaviorSubject<ProjectMember[]>([]);
  public readonly isOpen$ = new BehaviorSubject<boolean>(false);

  public set isOpen(val: boolean) {
    this.isOpen$.next(val);
  }

  public get isOpen() {
    return this.isOpen$.value;
  }

  constructor(public override ngControl: NgControl, private taskService: TaskService) {
    super(ngControl);
  }

  public open() {
    setTimeout(() => {
      fromEvent(document, 'click')
        .pipe(
          take(1),
          filter((e) => !this.overlay?.nativeElement.contains(e.target as Node)),
        )
        .subscribe(() => this.close());
      this.isOpen$.next(true);
    });
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

  public select(member: ProjectMember | null) {
    if (this.taskId && this.projectId)
      this.taskService
        .assign(member?.user.id || null, this.taskId, this.projectId)
        .subscribe(() => {
          this.close();
          location.reload();
        });
  }
}
