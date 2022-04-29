import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../../interfaces/status.interface';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { Observable, Subscription } from 'rxjs';
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
  public statuses!: Observable<Status[]>;
  public faPlus = faPlus;

  private statusesList: Status[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private statusService: StatusService,
    private dialogService: DialogService,
  ) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;

    this.statuses = this.statusService.list();
  }

  ngOnInit() {
    this.statuses.subscribe((statuses) => {
      this.statusesList = statuses;
    });
  }

  ngOnDestroy() {}

  drop(event: CdkDragDrop<Task[]>) {
    const index = Number(event.container.element.nativeElement.dataset['index']);
    const status = this.statusesList[index];

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
        variant: TaskDialogVariant.CREATE,
      } as TaskDialogData)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.taskService.create(result);
        }
      });
  }
}
