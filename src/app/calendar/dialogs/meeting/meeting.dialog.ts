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

export enum MeetingDialogVariant {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface MeetingDialogData {
  projectId?: number;
  meeting?: Partial<Meeting>;
  variant: MeetingDialogVariant;
}

@Component({
  selector: 'meeting-dialog',
  templateUrl: './meeting.dialog.html',
  styleUrls: ['./meeting.dialog.scss'],
})
export class MeetingDialog implements OnInit {
  projects$ = this.projectService.list();
  members$ = this.data.projectId ? this.memberService.list(this.data.projectId) : of([]);

  /** @ignore */
  MeetingDialogVariant = MeetingDialogVariant;

  public form = new FormGroup({
    id: new FormControl<number | null>(null),
    projectId: new FormControl<number | null>(null, [requiredValidator()]),
    name: new FormControl<string | null>('', [requiredValidator()]),
    location: new FormControl<string | null>(''),
    description: new FormControl<string | null>(''),
    startDate: new FormControl<unixTimestamp | null>(null, [requiredValidator()]),
    endDate: new FormControl<unixTimestamp | null>(null, [requiredValidator()]),
    participantIds: new FormControl<number[] | null>(null),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MeetingDialogData,
    private dialogRef: MatDialogRef<MeetingDialog>,
    private projectService: ProjectService,
    private memberService: MemberService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.getMyself().subscribe((user) => {
      const initialValue = {
        projectId: this.data.projectId,
        participantIds: user.id ? [user.id] : [],
        ...this.data.meeting,
      };

      this.form.patchValue(initialValue);

      this.form.get('projectId').valueChanges.subscribe((projectId) => {
        if (projectId) {
          this.members$ = this.memberService.list(projectId);
        } else {
          this.members$ = of([]);
        }
      });
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    if (validateForm(this.form)) {
      this.dialogRef.close(this.form.value);
    }
  }
}
