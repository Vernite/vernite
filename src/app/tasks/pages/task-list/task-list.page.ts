import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { ProjectService } from '@dashboard/services/project.service';
import { faDiagramNext, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Status } from '@tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { StatusService } from '@tasks/services/status.service';
import { TaskService } from '@tasks/services/task.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage {
  faPlus = faPlus;
  faDiagramNext = faDiagramNext;

  public projectId!: number;

  public taskList$!: Observable<Task[]>;
  public statusList$!: Observable<Status[]>;
  public project$!: Observable<Project>;

  private statusList: Status[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private statusService: StatusService,
    private projectService: ProjectService,
  ) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;

    this.projectId = projectId;
    this.project$ = this.projectService.get(projectId);
    this.taskList$ = this.taskService
      .list(projectId)
      .pipe(map((tasks) => tasks.filter((task) => !task.parentTaskId)));
    this.statusList$ = this.statusService.list(projectId);
    this.statusList$.subscribe((list) => {
      this.statusList = list;
    });
  }

  getStatus(statusId: number) {
    return this.statusList.find((status) => status.id === statusId)?.name;
  }
}
