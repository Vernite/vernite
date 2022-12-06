import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UserUtils } from '@dashboard/classes/user.class';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TaskService } from '@tasks/services/task/task.service';
import { TestNgControl } from '@tests/helpers/ng-control-testing-provider.helper';
import * as Color from 'color';
import { BehaviorSubject, filter, fromEvent, take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-assignee',
  templateUrl: './assignee.component.html',
  styleUrls: ['./assignee.component.scss'],
  providers: [{ provide: NgControl, useClass: TestNgControl }],
})
export class AssigneeComponent extends ControlAccessor {
  @Input() set assignee(assignee: ProjectMember | null) {
    this._assignee = assignee;

    if (assignee) {
      this.assigneeColor = UserUtils.getColorById(assignee?.user.id);
    } else {
      this.assigneeColor = undefined;
    }
  }
  public get assignee(): ProjectMember | null {
    return this._assignee;
  }

  @Input() set members(members: Map<number, ProjectMember> | ProjectMember[]) {
    if (Array.isArray(members)) {
      for (const member of members) {
        (member as any).color = UserUtils.getColorById(member.user.id);
      }
      this.members$.next(members as any);
    } else if (members) {
      const membersArray = [...members.values()];
      for (const member of membersArray) {
        (member as any).color = UserUtils.getColorById(member.user.id);
      }
      this.members$.next(membersArray as any);
    }
  }
  @Input() taskId?: number;
  @Input() projectId?: number;

  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;

  private _assignee: ProjectMember | null = null;

  public members$ = new BehaviorSubject<(ProjectMember & { color: Color })[]>([] as any);
  public readonly isOpen$ = new BehaviorSubject<boolean>(false);
  public assigneeColor?: Color;

  public set isOpen(val: boolean) {
    this.isOpen$.next(val);
  }

  public get isOpen() {
    return this.isOpen$.value;
  }

  constructor(
    public override ngControl: NgControl,
    private taskService: TaskService,
    cdRef: ChangeDetectorRef,
  ) {
    super(ngControl, cdRef);
  }

  public open() {
    setTimeout(() => {
      fromEvent(document, 'click')
        .pipe(
          take(1),
          untilDestroyed(this),
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
