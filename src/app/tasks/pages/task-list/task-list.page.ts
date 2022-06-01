import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { ProjectService } from '@dashboard/services/project.service';
import {
  faChevronRight,
  faCodeCommit,
  faCodePullRequest,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { ESet } from '@main/classes/e-set.class';
import { DialogService } from '@main/services/dialog.service';
import { TaskDialog, TaskDialogVariant } from '@tasks/dialogs/task/task.dialog';
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
  faChevronRight = faChevronRight;
  faCodeCommit = faCodeCommit;
  faCodePullRequest = faCodePullRequest;

  public projectId!: number;

  public taskList$!: Observable<Task[]>;
  public statusList$!: Observable<Status[]>;
  public project$!: Observable<Project>;

  private statusList: Status[] = [];

  isSubtasksRow = (i: number, row: Object) => row.hasOwnProperty('withSubtasks');
  expandedSubtasks = new ESet();

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private statusService: StatusService,
    private projectService: ProjectService,
    private dialogService: DialogService,
  ) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;

    this.projectId = projectId;
    this.project$ = this.projectService.get(projectId);
    this.taskList$ = this.taskService.list(projectId).pipe(
      map((tasks) => tasks.filter((task) => !task.parentTaskId)),
      // map((tasks) => this.populateSubtasks(tasks)),
    );
    this.statusList$ = this.statusService.list(projectId);
    this.statusList$.subscribe((list) => {
      this.statusList = list;
    });
  }

  getStatus(statusId: number) {
    return this.statusList.find((status) => status.id === statusId)?.name;
  }

  populateSubtasks(taskList: Task[]) {
    const populatedTasks = [];
    const tasks = taskList.filter((task) => !task.parentTaskId);

    for (const task of tasks) {
      populatedTasks.push(task);

      if (task.subTasks && task.subTasks.length) {
        populatedTasks.push({ ...task, withSubtasks: true });
      }
    }

    return populatedTasks;
  }

  createSubtask(task: Task) {
    this.dialogService
      .open(TaskDialog, {
        variant: TaskDialogVariant.CREATE,
        projectId: this.projectId,
        subtask: true,
        task: {
          parentTaskId: task.id,
        },
      })
      .afterClosed()
      .subscribe((task) => {
        if (!task) return;

        this.taskService.create(this.projectId, task).subscribe(() => {
          location.reload();
        });
      });
  }

  public getSubtasksContainerHeight(taskId: number, element: HTMLElement) {
    return `${Number(this.expandedSubtasks.has(taskId)) * element.scrollHeight}px`;
  }
}
