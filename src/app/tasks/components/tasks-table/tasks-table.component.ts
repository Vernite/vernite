import { Component, Input, OnInit } from '@angular/core';
import { faDiagramNext } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '@main/services/dialog.service';
import { Status } from '@tasks/interfaces/status.interface';
import { Task } from '@tasks/interfaces/task.interface';
import { StatusService } from '@tasks/services/status.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
})
export class TasksTableComponent implements OnInit {
  faDiagramNext = faDiagramNext;

  @Input() tasks!: Task[];

  @Input() projectId!: number;

  public statusList$!: Observable<Status[]>;
  private statusList: Status[] = [];

  public statusListLoaded = false;

  constructor(private statusService: StatusService, private dialogService: DialogService) {}

  getStatus(statusId: number) {
    return this.statusList.find((status) => status.id === statusId)?.name;
  }

  ngOnInit() {
    const { projectId } = this;

    this.statusList$ = this.statusService.list(projectId);
    this.statusList$.subscribe((list) => {
      this.statusList = list;
      this.statusListLoaded = true;
    });
  }
}
