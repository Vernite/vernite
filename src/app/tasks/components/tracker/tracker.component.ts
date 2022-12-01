import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { faCirclePlay, faCircleStop, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Task } from '@tasks/interfaces/task.interface';
import { BehaviorSubject, filter, interval, Observable } from 'rxjs';
import { TrackerService } from '../../services/tracker/tracker.service';
import { TimeTracksTotalPipe } from '../../pipes/time-tracks-total/time-tracks-total.pipe';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TimeTrack } from './../../interfaces/time-track.interface';
import { UserService } from '@auth/services/user/user.service';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';

@UntilDestroy()
@Component({
  selector: 'tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
  providers: [TimeTracksTotalPipe],
})
export class TrackerComponent implements OnInit {
  @ViewChild(CdkConnectedOverlay) overlay!: ElementRef<HTMLElement>;

  @Input() projectId!: number;
  @Input() set task(task: Task) {
    this._task = task;
    this.timeTracks = [
      ...task.timeTracks.map((track) => ({ ...track, new: false })),
      ...this.timeTracks.filter((track) => !track.id),
    ];
    this.timer$.next(this.timeTracksTotal.transform(task.timeTracks, 'milliseconds'));
    if ((task.timeTracks && task.timeTracks?.some((track) => !track.endDate)) || false) {
      this.enable();
    }
  }
  get task() {
    return this._task;
  }
  private _task!: Task;

  public timeTracks: ({ new: boolean } & TimeTrack)[] = [];

  /** @ignore */
  faCircleStop = faCircleStop;

  /** @ignore */
  faCirclePlay = faCirclePlay;

  /** @ignore */
  faTrash = faTrash;

  /** @ignore */
  faPlus = faPlus;

  public enabled = false;

  public readonly isOpen$ = new BehaviorSubject<boolean>(false);

  public readonly timer$ = new BehaviorSubject<number>(0);
  private interval$: Observable<number> = interval(1000);

  public set isOpen(val: boolean) {
    this.isOpen$.next(val);
  }

  public get isOpen() {
    return this.isOpen$.value;
  }

  constructor(
    private trackerService: TrackerService,
    private timeTracksTotal: TimeTracksTotalPipe,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.interval$
      .pipe(
        filter(() => this.enabled),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.timer$.next(this.timer$.value + 1000);
      });
  }

  public openDetails() {
    this.isOpen$.next(true);
  }

  public closeDetails() {
    this.isOpen$.next(false);
  }

  public toggleDetails() {
    if (this.isOpen) {
      return this.closeDetails();
    }
    return this.openDetails();
  }

  public stop() {
    this.trackerService.stop(this.projectId, this._task.id).subscribe();
    this.disable();
  }

  public start() {
    this.trackerService.start(this.projectId, this._task.id).subscribe();
    this.enable();
  }

  public toggle() {
    if (this.enabled) {
      return this.stop();
    }
    return this.start();
  }

  private enable() {
    this.enabled = true;
  }

  private disable() {
    this.enabled = false;
  }

  public insertTimeTrack() {
    this.userService.getMyself().subscribe((user) => {
      this.timeTracks = [
        ...this.timeTracks,
        {
          startDate: new Date().getTime(),
          projectId: this.projectId,
          taskId: this._task.id,
          new: true,
          userId: user.id,
          edited: true,
        },
      ];
    });
  }
}
