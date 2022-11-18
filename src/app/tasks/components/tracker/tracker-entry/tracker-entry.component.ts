import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@ngneat/reactive-forms';
import { TimeTrack } from '@tasks/interfaces/time-track.interface';
import { TrackerService } from '@tasks/services/tracker/tracker.service';
import { requiredValidator } from '@main/validators/required.validator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '@main/classes/loader/loader.class';
import { withLoader } from '@main/operators/loader.operator';
import { unixTimestamp } from '@main/interfaces/date.interface';
import { pairwise } from 'rxjs';
import { debounce } from 'lodash-es';

@UntilDestroy()
@Component({
  selector: 'tracker-entry',
  templateUrl: './tracker-entry.component.html',
  styleUrls: ['./tracker-entry.component.scss'],
})
export class TrackerEntryComponent implements OnInit {
  @Input() set timeTrack(timeTrack: { new: boolean } & TimeTrack) {
    this._timeTrack = timeTrack;
    this.form.patchValue(timeTrack);
  }
  get timeTrack() {
    return this._timeTrack;
  }

  @HostBinding('style.display') display = 'block';

  public readonly form = new FormGroup({
    startDate: new FormControl<unixTimestamp>(undefined, [requiredValidator()]),
    endDate: new FormControl<unixTimestamp>(undefined, [requiredValidator()]),
  });

  public readonly deleteLoader = new Loader();
  public readonly saveLoader = new Loader();

  private _timeTrack!: { new: boolean } & TimeTrack;

  /** @ignore */
  faTrash = faTrash;

  constructor(private trackerService: TrackerService) {
    this.save = debounce(this.save, 1000);
  }

  ngOnInit() {
    this.form.valueChanges.pipe(untilDestroyed(this), pairwise()).subscribe(([oldValue, value]) => {
      if (oldValue.startDate === value.startDate && oldValue.endDate === value.endDate) return;

      this._timeTrack = { ...this.timeTrack, ...value };
      if (this.form.valid) {
        this.save();
      }
    });
  }

  delete() {
    if (!this.timeTrack.id) {
      this.display = 'none';
      return;
    }

    this.trackerService
      .deleteWithConfirmation(this.timeTrack.projectId, this.timeTrack.taskId, this.timeTrack.id)
      .pipe(withLoader(this.deleteLoader))
      .subscribe(() => {
        this.display = 'none';
      });
  }

  save() {
    if (this.timeTrack.new) {
      this.trackerService
        .create(this.timeTrack.projectId, this.timeTrack.taskId, this.timeTrack)
        .pipe(withLoader(this.saveLoader))
        .subscribe((track) => {
          this.timeTrack = { ...track, new: false };
        });
    } else {
      this.trackerService
        .update(this.timeTrack.projectId, this.timeTrack.taskId, this.timeTrack)
        .pipe(withLoader(this.saveLoader))
        .subscribe((track) => {
          this.timeTrack = { ...track, new: false };
        });
    }
  }
}
