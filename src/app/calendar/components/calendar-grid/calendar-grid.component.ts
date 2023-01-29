import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EventType } from '@calendar/enums/event-type.enum';
import { Event } from '@calendar/interfaces/event.interface';
import { Task } from '@tasks/interfaces/task.interface';
import * as dayjs from 'dayjs';
import { weekdaysShort } from '@main/libs/localization/weekdays.localization.lib';

/**
 * Calendar grid component to display calendar
 */
@Component({
  selector: 'calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],
})
export class CalendarGridComponent implements OnChanges {
  /** Date to display */
  @Input() date!: dayjs.Dayjs;

  /** Events to display */
  @Input() events: Event[] = [];

  /** List of days to display */
  public days: {
    date: dayjs.Dayjs;
    events: {
      date: dayjs.Dayjs;
      type: 'start' | 'end';
      data: Event;
    }[];
  }[] = [];

  /** firstDay of the month */
  public firstDay: dayjs.Dayjs = dayjs();

  /** lastDay of the month */
  public lastDay: dayjs.Dayjs = dayjs();

  /** Map of tasks by date */
  public tasksByDate = new Map<number, Task[]>();

  /** List of weekdays */
  public weekdaysShort = weekdaysShort();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['date'] && !changes['date'].currentValue.isSame(changes['date'].previousValue)) {
      this.calculateGrid();

      if (this.events.length) {
        this.calculateEvents();
      }
    }

    if (changes['events']) {
      this.calculateEvents();
    }
  }

  /** Calculate grid */
  private calculateGrid() {
    this.firstDay = this.date.startOf('month');
    this.lastDay = this.date.endOf('month');

    const firstDay = this.date.startOf('month').startOf('week');
    const lastDay = this.date.endOf('month').endOf('week');

    const days: {
      date: dayjs.Dayjs;
      events: {
        date: dayjs.Dayjs;
        type: 'start' | 'end';
        data: Event;
      }[];
    }[] = [];
    let day = firstDay;

    while (day <= lastDay) {
      days.push({ date: day, events: [] });
      day = day.add(1, 'day');
    }

    this.days = days;
  }

  /** Clear events */
  private clearEvents() {
    this.days.forEach((day) => {
      day.events = [];
    });
  }

  /** Calculate events */
  private calculateEvents() {
    this.clearEvents();

    const addToDate = (event: Event, day: dayjs.Dayjs) => {
      const index = this.days.findIndex((d) => d.date.isSame(day, 'day'));

      if (index !== -1) {
        this.days[index].events.push({
          date: day,
          type: 'start',
          data: event,
        });
      }
    };

    for (const event of this.events) {
      if (event.startDate) {
        addToDate(event, dayjs(event.startDate));
      }
      if (event.endDate && event.type !== EventType.MEETING) {
        addToDate(event, dayjs(event.endDate));
      }
    }

    this.days.sort((a, b) => {
      if (a.date.isBefore(b.date)) {
        return -1;
      }
      if (a.date.isAfter(b.date)) {
        return 1;
      }
      return 0;
    });
  }
}
