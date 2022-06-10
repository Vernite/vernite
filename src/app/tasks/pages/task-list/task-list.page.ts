import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@auth/services/user.service';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { Project } from '@dashboard/interfaces/project.interface';
import { MemberService } from '@dashboard/services/member.service';
import { ProjectService } from '@dashboard/services/project.service';
import {
  faCheck,
  faChevronRight,
  faCodeCommit,
  faCodePullRequest,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ESet } from '@main/classes/e-set.class';
import { Filters } from '@main/classes/filters.class';
import { Filter } from '@main/interfaces/filters.interface';
import { DialogService } from '@main/services/dialog.service';
import { TaskDialog, TaskDialogVariant } from '@tasks/dialogs/task/task.dialog';
import { Status } from '@tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { StatusService } from '@tasks/services/status.service';
import { TaskService } from '@tasks/services/task.service';
import * as dayjs from 'dayjs';
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
  faCheck = faCheck;

  public projectId!: number;

  public taskList$!: Observable<Task[]>;
  public statusList$!: Observable<Status[]>;
  public project$!: Observable<Project>;
  public members$!: Observable<Map<number, ProjectMember>>;
  public assigneeControl = new FormControl(null);

  public statusList: Status[] = [];

  public filters: Filter[] = [];
  public filtersControl = new FormControl();

  isSubtasksRow = (i: number, row: Object) => row.hasOwnProperty('withSubtasks');
  expandedSubtasks = new ESet();

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private statusService: StatusService,
    private projectService: ProjectService,
    private dialogService: DialogService,
    private memberService: MemberService,
    private userService: UserService,
  ) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;

    this.projectId = projectId;
    this.project$ = this.projectService.get(projectId);

    /**
     * TODO: Use method from service
     */
    this.members$ = this.memberService.list(projectId).pipe(
      map((members) =>
        members.reduce((acc: Map<number, ProjectMember>, member: ProjectMember) => {
          acc.set(member.user.id, member);
          return acc;
        }, new Map<number, ProjectMember>()),
      ),
    );
    this.taskList$ = this.taskService
      .list(projectId)
      .pipe(map((tasks) => tasks.filter((task) => !task.parentTaskId)));
    this.statusList$ = this.statusService.list(projectId);
    this.statusList$.subscribe((list) => {
      this.statusList = list;
    });
    this.userService.getMyself().subscribe((user) => {
      this.filters.push(Filters.ONLY_MY_TASKS(user.id));
    });

    this.filtersControl.valueChanges.subscribe((filters) => {
      this.taskList$ = this.taskService.list(projectId, filters);
    });
  }

  getStatus(statusId: number) {
    return this.statusList.find((status) => status.id === statusId)?.name;
  }

  changeDate(date?: Date) {
    if (!date) return '-';
    let sessionDate = dayjs(date);
    return sessionDate.format('YYYY-MM-DD, hh:mm A');
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

  /**
   * TODO: Move this method to service
   */
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

  editTask(task: Task) {
    this.taskService.openEditTaskDialog(this.projectId, task).subscribe(() => {
      location.reload();
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteWithConfirmation(this.projectId, task).subscribe(() => {
      location.reload();
    });
  }

  initAssigneeChanging() {
    this.assigneeControl.valueChanges.subscribe((assignee) => {});
  }

  public getSubtasksContainerHeight(taskId: number, element: HTMLElement) {
    return `${Number(this.expandedSubtasks.has(taskId)) * element.scrollHeight}px`;
  }
}
