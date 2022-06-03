import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { ProjectService } from '@dashboard/services/project.service';
import { Schedule } from '@tasks/interfaces/schedule.interface';
import { TaskService } from '@tasks/services/task.service';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  public schedule$: Observable<Schedule>;
  public project$: Observable<Project>;

  public cursor = dayjs().toDate();
  public limitAfter = 20;
  public limitBefore = 0;

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

  ngOnInit() {}
}
