import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { ProjectService } from '@dashboard/services/project/project.service';
import { Schedule } from '@tasks/interfaces/schedule.interface';
import { TaskService } from '@tasks/services/task/task.service';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';

/**
 * Project schedule page
 * @deprecated Not used at this time - need to be replaced with proper schedule view in calendar (TODO)
 */
@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {
  /** Schedule with tasks */
  public schedule$: Observable<Schedule>;

  /** Project */
  public project$: Observable<Project>;

  /** Timeline start cursor */
  public cursor = dayjs().toDate();

  /** Days limit after today to display */
  public limitAfter = 20;

  /** Days limit before today to display */
  public limitBefore = 0;

  /** All dates to display in view */
  public get dates() {
    const { cursor, limitBefore, limitAfter } = this;

    const dates = [];

    for (let i = 0; i < limitBefore + limitAfter + 1; i++) {
      dates.push(
        dayjs(cursor)
          .subtract(limitBefore - i, 'day')
          .toDate(),
      );
    }

    return dates;
  }

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
  ) {
    const { projectId } = this.activatedRoute.snapshot.params;

    this.schedule$ = this.taskService.schedule(projectId);
    this.project$ = this.projectService.get(projectId);
  }
}
