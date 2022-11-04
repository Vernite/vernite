import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '@tasks/interfaces/task.interface';
import * as dayjs from 'dayjs';

@Component({
  selector: 'calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],
})
export class CalendarGridComponent implements OnChanges {
  @Input() date!: dayjs.Dayjs;
  @Input() tasks: Task[] = [];

  public days: {
    date: dayjs.Dayjs;
    tasks: Task[];
  }[] = [];
  public firstDay: dayjs.Dayjs = dayjs();
  public lastDay: dayjs.Dayjs = dayjs();

  public tasksByDate = new Map<number, Task[]>();

  public weekdaysShort = dayjs.weekdaysShort();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['date'] && !changes['date'].currentValue.isSame(changes['date'].previousValue)) {
      this.calculateGrid();

      if (this.tasks.length) {
        this.calculateTaskEvents();
      }
    }

    if (changes['tasks']) {
      this.calculateTaskEvents();
    }
  }

  private calculateGrid() {
    console.log('calculateGrid');

    this.firstDay = this.date.startOf('month');
    this.lastDay = this.date.endOf('month');

    const firstDay = this.date.startOf('month').startOf('week');
    const lastDay = this.date.endOf('month').endOf('week');

    const days: {
      date: dayjs.Dayjs;
      tasks: Task[];
    }[] = [];
    let day = firstDay;

    while (day <= lastDay) {
      days.push({ date: day, tasks: [] });
      day = day.add(1, 'day');
    }

    this.days = days;
  }

  private calculateTaskEvents() {
    console.log('calculateTaskEvents');

    for (const task of this.tasks) {
      if (task.estimatedDate) {
        const day = dayjs(task.estimatedDate);
        const index = this.days.findIndex((d) => d.date.isSame(day, 'day'));

        if (index !== -1) {
          this.days[index].tasks.push(task);
        }
      }
    }
  }
}
