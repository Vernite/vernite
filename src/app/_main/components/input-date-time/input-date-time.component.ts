import { Component, Input, ElementRef, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, fromEvent, take, filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgControl } from '@angular/forms';
import { FormControl } from '@ngneat/reactive-forms';
import { unixTimestamp } from '../../interfaces/date.interface';
import dayjs from 'dayjs';
import { KeyboardKey } from '@main/interfaces/keyboard-key.interface';
import { DatePickerComponent } from './date-picker/date-picker.component';

@UntilDestroy()
@Component({
  selector: 'app-input-date-time',
  templateUrl: './input-date-time.component.html',
  styleUrls: ['./input-date-time.component.scss'],
})
export class InputDateTimeComponent
  extends ControlAccessor<unixTimestamp | null>
  implements OnInit
{
  @Input() placeholder: string = '';

  @Input() floatingLabel?: string;

  @Input() staticLabel?: string;

  @Input() pending?: boolean;

  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;
  @ViewChild(DatePickerComponent) datePicker?: DatePickerComponent;

  /** @ignore */
  faCalendar = faCalendar;

  isPickerOpen$ = new BehaviorSubject<boolean>(false);

  // TODO: Load this from user settings
  displayFormat = 'DD.MM.YYYY HH:mm';

  override displayControl = new FormControl<string>(this.format(this.control?.value));

  focused: boolean = false;

  constructor(private elementRef: ElementRef, cdRef: ChangeDetectorRef, ngControl: NgControl) {
    super(ngControl, cdRef);
  }

  override ngOnInit() {
    super.ngOnInit();

    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter((event) => (event.key as KeyboardKey) === 'Backspace'),
        filter(() => this.focused),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.control.setValue(null);
      });
  }

  waitForClickOutside(fn: () => void) {
    fromEvent(document, 'mousedown')
      .pipe(
        untilDestroyed(this),
        filter((e) => {
          return (
            (!this.overlay || !this.overlay.nativeElement.contains(e.target as Node)) &&
            (!this.elementRef || !this.elementRef.nativeElement.contains(e.target as Node))
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
      this.focused = state;
      this.openPicker();
    }
  }

  private format(value: unixTimestamp | null) {
    if (!value) return '';
    return dayjs(value).format(this.displayFormat);
  }

  override writeValue(value: unixTimestamp | null): void {
    super.writeValue(value);
    this.displayControl.setValue(this.format(value));
    if (this.datePicker) {
      this.datePicker.writeValue(value);
    }
  }
}
