import { Component, Input } from '@angular/core';
import { EventType } from '@calendar/enums/event-type.enum';
import { Event } from '@calendar/interfaces/event.interface';
import { faArrowUpRightFromSquare, faClose } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss'],
})
export class CalendarEventComponent {
  @Input() event!: Event;

  public isOpen = false;

  /** @ignore */
  faClose = faClose;

  /** @ignore */
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  constructor(private router: Router) {}

  openDetails() {
    switch (this.event.type) {
      case EventType.MEETING:
        this.router.navigate(['/meetings', this.event.relatedId]);
        break;
      case EventType.TASK_DEADLINE:
      case EventType.TASK_ESTIMATE:
        this.router.navigate([
          '/',
          'projects',
          this.event.projectId,
          'tasks',
          this.event.relatedId,
        ]);
        break;
      case EventType.SPRINT:
        this.router.navigate(['/sprints', this.event.relatedId]);
        break;
    }
  }
}
