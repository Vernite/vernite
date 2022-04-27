import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../../interfaces/status.interface';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { Observable, Subscription } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit, OnDestroy {
  public columns!: Observable<Status[]>;
  public faPlus = faPlus;

  private statuses: string[] = [];

  private columnsSubscription?: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private taskService: TaskService) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;
    console.log({ workspaceId, projectId });

    this.columns = this.taskService.tree();
  }

  ngOnInit() {
    this.columnsSubscription = this.columns.subscribe((columns) => {
      this.statuses = columns.map((column) => column.name);
    });
  }

  ngOnDestroy() {
    this.columnsSubscription?.unsubscribe();
  }

  drop(event: CdkDragDrop<Task[]>) {
    const index = Number(event.container.element.nativeElement.dataset['index']);
    const status = this.statuses[index];

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
}
