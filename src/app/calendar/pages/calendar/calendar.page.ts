import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '@tasks/interfaces/task.interface';
import { TaskService } from '@tasks/services/task/task.service';
import dayjs from 'dayjs';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'calendar-page',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  public projectId: number | null = null;
  public date = dayjs();
  public tasks$: Observable<Task[]> = of([]);

  constructor(private activatedRoute: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    const projectId = this.activatedRoute.snapshot.paramMap.get('projectId');

    if (projectId) {
      this.projectId = parseInt(projectId);
      this.tasks$ = this.taskService.list(this.projectId);
    }

    this.activatedRoute.data.subscribe((data) => {
      const { projectId } = data;

      if (projectId) {
        this.projectId = parseInt(projectId);
        this.tasks$ = this.taskService.list(this.projectId);
      }
    });
  }
}
