import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as dayjs from 'dayjs';
import { faPlus, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { MeetingService } from '@calendar/services/meeting.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '@calendar/services/calendar.service';

@UntilDestroy()
@Component({
  selector: 'calendar-sidebar',
  templateUrl: './calendar-sidebar.component.html',
  styleUrls: ['./calendar-sidebar.component.scss'],
})
export class CalendarSidebarComponent implements OnInit {
  @Input() set date(date: dayjs.Dayjs) {
    this.cursor.setValue(date);
  }

  @Output() selectDate = new EventEmitter<dayjs.Dayjs>();

  public cursor = new FormControl<dayjs.Dayjs>();

  public projectId: number | null = null;

  /** @ignore */
  faPlus = faPlus;

  /** @ignore */
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  constructor(
    private meetingService: MeetingService,
    private activatedRoute: ActivatedRoute,
    private calendarService: CalendarService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: { projectId?: string }) => {
      const { projectId } = params;
      this.projectId = projectId ? parseInt(projectId) : null;
    });

    this.cursor.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.selectDate.emit(dayjs(value));
    });
  }

  openNewMeetingDialog() {
    this.meetingService.openNewMeetingDialog(this.projectId || undefined).subscribe(() => {
      location.reload();
    });
  }

  openExportDialog() {
    this.calendarService.openSyncUrlDialog().subscribe();
  }
}
