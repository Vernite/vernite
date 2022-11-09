import { Component, Input } from '@angular/core';
import { Event } from '@calendar/interfaces/event.interface';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss'],
})
export class CalendarEventComponent {
  @Input() event!: Event;

  public isOpen = false;

  faClose = faClose;
}
