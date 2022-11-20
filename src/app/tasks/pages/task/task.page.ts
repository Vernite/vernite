import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@auth/interfaces/user.interface';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Status } from '@tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { TaskService } from '@tasks/services/task/task.service';
import { EMPTY, Observable, tap, of } from 'rxjs';
import { StatusService } from './../../services/status/status.service';
import { UserService } from './../../../auth/services/user/user.service';
import { MemberService } from '@dashboard/services/member/member.service';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';

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

  private projectId: number = 0;
  private taskId: number = 0;

  /** @ignore */
  faPen = faPen;

  /** @ignore */
  faTrash = faTrash;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private statusService: StatusService,
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

  loadTask(projectId: number, taskId: number) {
    this.task$ = this.taskService.get(projectId, taskId).pipe(
      tap((task) => (this.status$ = this.statusService.get(projectId, task.statusId!))),
      tap((task) =>
        task.assigneeId
          ? (this.assignee$ = this.memberService.get(projectId, task.assigneeId))
          : of(null),
      ),
      tap((task) => (this.createdBy$ = this.memberService.get(projectId, task.createdBy!))),
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
