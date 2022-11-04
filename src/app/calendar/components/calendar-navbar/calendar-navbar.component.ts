import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

@Component({
  selector: 'calendar-navbar',
  templateUrl: './calendar-navbar.component.html',
  styleUrls: ['./calendar-navbar.component.scss'],
})
export class CalendarNavbarComponent {
  @Input() public date!: dayjs.Dayjs;

  @Output() public nextMonth = new EventEmitter<void>();
  @Output() public previousMonth = new EventEmitter<void>();

  @Output() public today = new EventEmitter<void>();

  /** @ignore */
  faChevronLeft = faChevronLeft;

  /** @ignore */
  faChevronRight = faChevronRight;
}
