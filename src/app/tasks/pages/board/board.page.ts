import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status, StatusWithTasks } from '../../interfaces/status.interface';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { map, Observable, Subscription } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { StatusService } from '../../services/status.service';
import { DialogService } from '../../../_main/services/dialog.service';
import { TaskDialog, TaskDialogData, TaskDialogVariant } from '../../dialogs/task/task.dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit, OnDestroy {
  public faPlus = faPlus;
  public projectId!: number;

  public statusList$!: Observable<StatusWithTasks[]>;
  public statusList: StatusWithTasks[] = [];
  private statusListSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private statusService: StatusService,
    private dialogService: DialogService,
  ) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;

    this.projectId = projectId;
    this.statusList$ = this.statusService.listWithTasks(projectId);
    this.statusListSubscription = this.statusList$.subscribe((statusList) => {
      this.statusList = statusList;
    });
  }

  getTasksFromStatus(statusId: number) {
    return this.statusList.find((status) => status.id === statusId)?.tasks;
  }

  ngOnInit() {
    this.statusList$.subscribe((statusList) => {
      this.statusList = statusList;
    });
  }

  ngOnDestroy() {
    this.statusListSubscription?.unsubscribe();
  }

  drop(event: CdkDragDrop<Task[]>) {
    const previousStatusIndex = Number(
      event.previousContainer.element.nativeElement.dataset['index'],
    );
    const newStatusIndex = Number(event.container.element.nativeElement.dataset['index']);
    const previousStatus = this.statusList[previousStatusIndex];
    const newStatus = this.statusList[newStatusIndex];
    const previousTaskIndex = event.previousIndex;
    const task = previousStatus.tasks[previousTaskIndex];

    task.status = newStatus.id;
    this.taskService.update(this.projectId, task).subscribe();

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  openNewTaskDialog() {
    this.dialogService
      .open(TaskDialog, {
        projectId: this.projectId,
        variant: TaskDialogVariant.CREATE,
      } as TaskDialogData)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.taskService.create(this.projectId, result);
        }
      });
  }
}
