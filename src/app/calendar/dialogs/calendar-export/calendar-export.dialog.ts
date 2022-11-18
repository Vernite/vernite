import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Meeting } from '@calendar/interfaces/meeting.interface';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { unixTimestamp } from '@main/interfaces/date.interface';
import { validateForm } from '@main/classes/form.class';
import { ProjectService } from '@dashboard/services/project/project.service';
import { map, of } from 'rxjs';
import { requiredValidator } from '@main/validators/required.validator';
import { MemberService } from '@dashboard/services/member/member.service';
import { UserService } from '@auth/services/user/user.service';
import { CalendarService } from '@calendar/services/calendar.service';
import { Loader } from '@main/classes/loader/loader.class';
import { withLoader } from '@main/operators/loader.operator';

export interface CalendarExportDialogData {
  projectId?: number;
}

@Component({
  selector: 'calendar-export-dialog',
  templateUrl: './calendar-export.dialog.html',
  styleUrls: ['./calendar-export.dialog.scss'],
})
export class CalendarExportDialog implements OnInit {
  public loader = new Loader();

  public form = new FormGroup({
    url: new FormControl<string | null>(null),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CalendarExportDialogData,
    private dialogRef: MatDialogRef<CalendarExportDialog>,
    private calendarService: CalendarService,
  ) {}

  ngOnInit() {
    this.calendarService
      .getSyncUrl(this.data.projectId)
      .pipe(withLoader(this.loader))
      .subscribe((url) => {
        console.log(url);
        this.form.patchValue({ url });
      });
  }

  close() {
    this.dialogRef.close();
  }
}
