import { Component } from '@angular/core';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ControlAccessor } from '@main/classes/control-accessor/control-accessor.class';
import dayjs, { UnitType } from 'dayjs';
import { unixTimestamp } from '../../../interfaces/date.interface';
import { interval, takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent extends ControlAccessor<unixTimestamp | null> {
  cursor = this.control.value ? dayjs(this.control.value) : dayjs();

  /** @ignore */
  faChevronUp = faChevronUp;

  /** @ignore */
  faChevronDown = faChevronDown;

  private _isKeyReleased$ = new Subject<null>();

  now() {
    const today = dayjs();

    this.cursor = this.cursor.set('hour', today.hour());
    this.cursor = this.cursor.set('minute', today.minute());

    this.control.setValue(this.cursor.valueOf());
  }

  onKeyDown(callback: () => void) {
    callback.apply(this);
    interval(200)
      .pipe(takeUntil(this._isKeyReleased$), takeUntil(this.destroy$))
      .subscribe(() => {
        callback.apply(this);
      });
  }

  onKeyUp() {
    this._isKeyReleased$.next(null);
  }

  increaseMinutes() {
    this.cursor = this.cursor.add(1, 'minute');
    this.setControlProperties(['hour', 'minute'], [this.cursor.hour(), this.cursor.minute()]);
  }

  decreaseMinutes() {
    this.cursor = this.cursor.subtract(1, 'minute');
    this.setControlProperties(['hour', 'minute'], [this.cursor.hour(), this.cursor.minute()]);
  }

  increaseHours() {
    this.cursor = this.cursor.add(1, 'hour');
    this.setControlProperties(['hour', 'minute'], [this.cursor.hour(), this.cursor.minute()]);
  }

  decreaseHours() {
    this.cursor = this.cursor.subtract(1, 'hour');
    this.setControlProperties(['hour', 'minute'], [this.cursor.hour(), this.cursor.minute()]);
  }

  setControlProperties(propertyNames: UnitType[], values: number[]) {
    let value = dayjs(this.control.value || 0);
    for (let i = 0; i < Math.min(propertyNames.length, values.length); i++) {
      value = value.set(propertyNames[i], values[i]);
    }
    this.control.setValue(value.valueOf());
  }

  onHourChange(event: Event) {
    const value = (event.target as HTMLInputElement)?.valueAsNumber;
    this.cursor = this.cursor.set('hour', value);
    this.setControlProperties(['hour', 'minute'], [this.cursor.hour(), this.cursor.minute()]);
  }

  onMinuteChange(event: Event) {
    const value = (event.target as HTMLInputElement)?.valueAsNumber;
    this.cursor = this.cursor.set('minute', value);
    this.setControlProperties(['hour', 'minute'], [this.cursor.hour(), this.cursor.minute()]);
  }

  override ngAfterControlInit(): void {
    if (this.control.value) {
      this.cursor = dayjs(this.control.value);
    }
  }

  override writeValue(value: unixTimestamp | null) {
    super.writeValue(value);
    if (value) {
      this.cursor = dayjs(value);
    }
  }
}
