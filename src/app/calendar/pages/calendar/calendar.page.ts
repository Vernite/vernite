import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@auth/services/user/user.service';
import { Event } from '@calendar/interfaces/event.interface';
import { TaskService } from '@tasks/services/task/task.service';
import dayjs from 'dayjs';
import { Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'calendar-page',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  public projectId: number | null = null;
  public date = dayjs();
  public events$: Observable<Event[]> = of([]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.activatedRoute.data
      .pipe(startWith(this.activatedRoute.snapshot.params))
      .subscribe((params: { projectId?: string }) => {
        const { projectId } = params;

        if (projectId) {
          this.projectId = parseInt(projectId);
        } else {
          this.events$ = this.userService.events(
            this.date.startOf('month').valueOf(),
            this.date.endOf('month').valueOf(),
          );
        }
      });
  }
}
