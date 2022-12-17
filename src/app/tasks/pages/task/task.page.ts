import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Status } from '@tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { TaskService } from '@tasks/services/task/task.service';
import { EMPTY, Observable, tap, of, map } from 'rxjs';
import { StatusService } from './../../services/status/status.service';
import { MemberService } from '@dashboard/services/member/member.service';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { Sprint } from '@tasks/interfaces/sprint.interface';
import { SprintService } from '@tasks/services/sprint.service';
import { SprintFilters } from '@dashboard/filters/sprint.filters';
import { SprintStatus } from '@tasks/enums/sprint-status.enum';

@Component({
  selector: 'task-page',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage {
  public task$: Observable<Task> = EMPTY;
  public status$: Observable<Status> = EMPTY;
  public assignee$: Observable<ProjectMember | null> = EMPTY;
  public createdBy$: Observable<ProjectMember> = EMPTY;

  public activeSprint$: Observable<Sprint> = EMPTY;
  public archivedSprints$: Observable<Sprint[]> = EMPTY;

  public projectId: number = 0;
  public taskId: number = 0;

  /** @ignore */
  faPen = faPen;

  /** @ignore */
  faTrash = faTrash;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private statusService: StatusService,
    private sprintService: SprintService,
    private memberService: MemberService,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      const { projectId, taskId } = params;

      this.projectId = projectId;
      this.taskId = taskId;
      this.loadTask(Number(projectId), Number(taskId));
    });
  }

  /**
   * Load task data into view
   * @TODO: Refactor this method
   * @param projectId Id of the project
   * @param taskId Id of the task
   */
  loadTask(projectId: number, taskId: number) {
    this.task$ = this.taskService.get(projectId, taskId).pipe(
      tap((task) => (this.status$ = this.statusService.get(projectId, task.statusId!))),
      tap((task) =>
        task.assigneeId
          ? (this.assignee$ = this.memberService.get(projectId, task.assigneeId))
          : of(null),
      ),
      tap((task) => (this.createdBy$ = this.memberService.get(projectId, task.createdBy!))),
      tap((task) => {
        if (task.sprintId) {
          this.activeSprint$ = this.sprintService.get(this.projectId, task.sprintId);
        }
        if (task.archiveSprintIds?.length) {
          this.archivedSprints$ = this.sprintService
            .list(this.projectId, SprintFilters.STATUS(SprintStatus.CLOSED))
            .pipe(
              map((sprints) =>
                sprints.filter((sprint) => task.archiveSprintIds?.includes(sprint.id)),
              ),
            );
        }
      }),
    );
  }

  deleteTask() {
    this.task$.subscribe((task) => {
      this.taskService.deleteWithConfirmation(task.projectId, task).subscribe(() => {
        this.router.navigate(['/', 'projects', task.projectId, 'backlog']);
      });
    });
  }

  editTask() {
    this.task$.subscribe((task) => {
      this.taskService.openEditTaskDialog(task.projectId, task).subscribe(() => {
        this.loadTask(this.projectId, this.taskId);
      });
    });
  }
}
