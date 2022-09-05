import { Component, Input, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, fromEvent, take, filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgControl } from '@angular/forms';
import { FormControl } from '@ngneat/reactive-forms';
import { unixTimestamp } from '../../interfaces/date.interface';
import dayjs from 'dayjs';

@UntilDestroy()
@Component({
  selector: 'app-input-date-time',
  templateUrl: './input-date-time.component.html',
  styleUrls: ['./input-date-time.component.scss'],
})
export class InputDateTimeComponent extends ControlAccessor<unixTimestamp | null> {
  @Input() placeholder: string = '';

  @Input() floatingLabel?: string;

  @Input() staticLabel?: string;

  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;

  /** @ignore */
  faCalendar = faCalendar;

  isPickerOpen$ = new BehaviorSubject<boolean>(false);

  // TODO: Load this from user settings
  displayFormat = 'DD.MM.YYYY HH:mm';

  displayControl = new FormControl<string>(this.format(this.control?.value));

  constructor(private elementRef: ElementRef, cdRef: ChangeDetectorRef, ngControl: NgControl) {
    super(ngControl, cdRef);
  }

  waitForClickOutside(fn: () => void) {
    fromEvent(document, 'click')
      .pipe(
        untilDestroyed(this),
        filter((e) => {
          return (
            !this.overlay.nativeElement.contains(e.target as Node) &&
            !this.elementRef.nativeElement.contains(e.target as Node)
          );
        }),
        take(1),
      )
      .subscribe(() => fn());
  }

  openPicker() {
    this.isPickerOpen$.next(true);
    setTimeout(() => {
      this.waitForClickOutside(() => this.closePicker());
    }, 100);
  }

  closePicker() {
    this.isPickerOpen$.next(false);
  }

  onFocusStateChanged(state: boolean) {
    if (state) {
      this.openPicker();
    }
  }

  private format(value: unixTimestamp | null) {
    if (!value) return '';
    return dayjs.unix(value).format(this.displayFormat);
  }

  override writeValue(value: unixTimestamp): void {
    super.writeValue(value);
    this.displayControl.setValue(this.format(value));
  }
}
