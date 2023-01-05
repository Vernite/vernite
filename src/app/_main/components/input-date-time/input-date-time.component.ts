import { Component, Input, ElementRef, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { ControlAccessor } from '@main/classes/control-accessor/control-accessor.class';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, fromEvent, take, filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgControl } from '@angular/forms';
import { FormControl } from '@ngneat/reactive-forms';
import { unixTimestamp } from '../../interfaces/date.interface';
import dayjs from 'dayjs';
import { KeyboardKey } from '@main/interfaces/keyboard-key.interface';
import { DatePickerComponent } from './date-picker/date-picker.component';

/**
 * Input date time component
 */
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
  /** Placeholder */
  @Input() placeholder: string = '';

  /** Floating label */
  @Input() floatingLabel?: string;

  /** Static label visible above input */
  @Input() staticLabel?: string;

  /** Is input pending */
  @Input() pending?: boolean;

  /** Overlay element reference */
  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;

  /** Date picker component reference */
  @ViewChild(DatePickerComponent) datePicker?: DatePickerComponent;

  /** @ignore */
  faCalendar = faCalendar;

  /** Is date picker open */
  isPickerOpen$ = new BehaviorSubject<boolean>(false);

  /**
   * Date display format
   * @TODO Load this from user settings
   */
  displayFormat = 'DD.MM.YYYY HH:mm';

  override displayControl = new FormControl<string>(this.format(this.control?.value));

  /** If element is focused */
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

  /**
   * Wait for click outside of element
   * @param fn Function to call when click outside of element
   */
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

  /**
   * Open date picker
   */
  openPicker() {
    this.isPickerOpen$.next(true);
    setTimeout(() => {
      this.waitForClickOutside(() => this.closePicker());
    }, 100);
  }

  /**
   * Close date picker
   */
  closePicker() {
    this.isPickerOpen$.next(false);
  }

  /**
   * On focus state changed
   * @param state If element is focused
   */
  onFocusStateChanged(state: boolean) {
    this.focused = state;

    if (state) {
      this.openPicker();
    }
  }

  /**
   * Format date to specific format
   * @param value Date to format
   * @returns Formatted date
   */
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
