import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

/**
 * Calendar navbar component to display calendar
 */
@Component({
  selector: 'calendar-navbar',
  templateUrl: './calendar-navbar.component.html',
  styleUrls: ['./calendar-navbar.component.scss'],
})
export class CalendarNavbarComponent {
  /** Date to display */
  @Input() public date!: dayjs.Dayjs;

  /** Event emitter to emit next month */
  @Output() public nextMonth = new EventEmitter<void>();

  /** Event emitter to emit previous month */
  @Output() public previousMonth = new EventEmitter<void>();

  /** Event emitter to emit today */
  @Output() public today = new EventEmitter<void>();

  constructor() {}

  /** @ignore */
  faChevronLeft = faChevronLeft;

  /** @ignore */
  faChevronRight = faChevronRight;
}
