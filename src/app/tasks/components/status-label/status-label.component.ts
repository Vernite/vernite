import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { Status } from '@tasks/interfaces/status.interface';
import { TaskService } from '@tasks/services/task.service';
import { TestNgControl } from '@tests/helpers/ng-control-testing-provider.helper';
import { BehaviorSubject, filter, fromEvent, take } from 'rxjs';

@Component({
  selector: 'app-status-label',
  templateUrl: './status-label.component.html',
  styleUrls: ['./status-label.component.scss'],
  providers: [{ provide: NgControl, useClass: TestNgControl }],
})
export class StatusLabelComponent extends ControlAccessor {
  @Input() variant: 'default' | 'small' = 'default';
  @Input() projectId!: number;
  @Input() statusId!: number;
  @Input() taskId?: number;
  @Input() set statuses(statuses: Status[]) {
    this.statuses$.next(statuses);
    this.statusMap = statuses.reduce((acc, status) => {
      acc.set(status.id!, status);
      return acc;
    }, new Map<number, Status>());
  }

  statusMap = new Map<number, Status>();

  constructor(
    public override ngControl: NgControl,
    private taskService: TaskService,
    cdRef: ChangeDetectorRef,
  ) {
    super(ngControl, cdRef);
  }

  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;

  public statuses$ = new BehaviorSubject<Status[]>([]);
  public readonly isOpen$ = new BehaviorSubject<boolean>(false);

  public set isOpen(val: boolean) {
    this.isOpen$.next(val);
  }

  public get isOpen() {
    return this.isOpen$.value;
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

  public select(status: Status) {
    if (this.taskId && this.projectId)
      this.taskService.changeStatus(status.id!, this.taskId, this.projectId).subscribe(() => {
        this.close();
        location.reload();
      });
  }
}
