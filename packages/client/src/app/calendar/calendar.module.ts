import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarGridComponent } from './components/calendar-grid/calendar-grid.component';
import { CalendarPage } from './pages/calendar/calendar.page';
import { CalendarNavbarComponent } from './components/calendar-navbar/calendar-navbar.component';
import { MainModule } from '@main/_main.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarRoutingModule } from './calendar.routing';
import { CalendarSidebarComponent } from './components/calendar-sidebar/calendar-sidebar.component';
import { TasksModule } from '../tasks/tasks.module';
import { EventTypePipe } from './pipes/event-type/event-type.pipe';
import { CalendarEventComponent } from './components/calendar-event/calendar-event.component';
import { MeetingDialog } from './dialogs/meeting/meeting.dialog';
import { CalendarExportDialog } from './dialogs/calendar-export/calendar-export.dialog';

@NgModule({
  imports: [CommonModule, MainModule, CalendarRoutingModule, TasksModule],
  declarations: [
    CalendarPage,
    CalendarGridComponent,
    CalendarNavbarComponent,
    CalendarSidebarComponent,
    CalendarComponent,
    EventTypePipe,
    CalendarExportDialog,
    CalendarEventComponent,
    MeetingDialog,
  ],
})
export class CalendarModule {}
