import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { faCirclePlay, faCircleStop } from '@fortawesome/free-solid-svg-icons';
import { Task } from '@tasks/interfaces/task.interface';
import { BehaviorSubject, filter, fromEvent, interval, take, takeWhile } from 'rxjs';
import { TrackerService } from '../../services/tracker/tracker.service';
import { TimeTracksTotalPipe } from '../../pipes/time-tracks-total/time-tracks-total.pipe';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
  providers: [TimeTracksTotalPipe],
})
export class TrackerComponent {
  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;

  @Input() set task(task: Task) {
    this._task = task;
    this.enabled = task.timeTracks?.some((track) => track.enabled) || false;
    this.timer$.next(this.timeTracksTotal.transform(task.timeTracks, 'milliseconds'));
  }
  get task() {
    return this._task;
  }
  private _task!: Task;

  /** @ignore */
  faCircleStop = faCircleStop;

  /** @ignore */
  faCirclePlay = faCirclePlay;

  public enabled = false;

  public readonly isOpen$ = new BehaviorSubject<boolean>(false);

  public readonly timer$ = new BehaviorSubject<number>(0);

  public set isOpen(val: boolean) {
    this.isOpen$.next(val);
  }

  public get isOpen() {
    return this.isOpen$.value;
  }

  constructor(
    private trackerService: TrackerService,
    private timeTracksTotal: TimeTracksTotalPipe,
  ) {}

  public openDetails() {
    setTimeout(() => {
      fromEvent(document, 'click')
        .pipe(
          filter((e) => !this.overlay?.nativeElement.contains(e.target as Node)),
          take(1),
        )
        .subscribe(() => this.closeDetails());
      this.isOpen$.next(true);
    });
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
    this.trackerService.stop(this._task.id);
    this.disable();
  }

  public start() {
    this.trackerService.start(this._task.id);
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
    interval(1000)
      .pipe(
        untilDestroyed(this),
        takeWhile(() => this.enabled),
      )
      .subscribe(() => {
        const currentTimer = this.timer$.value;
        this.timer$.next(currentTimer + 1000);
      });
  }

  private disable() {
    this.enabled = false;
  }
}
