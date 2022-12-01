import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Task } from '@tasks/interfaces/task.interface';
import { groupBy, mapValues } from 'lodash-es';
import { Status } from '../../../tasks/interfaces/status.interface';
import { ConnectedPosition } from '@angular/cdk/overlay';
import Color from 'color';

/** Component to display release progress */
@Component({
  selector: 'release-progress-bar',
  templateUrl: './release-progress-bar.component.html',
  styleUrls: ['./release-progress-bar.component.scss'],
})
export class ReleaseProgressBarComponent implements OnInit, OnChanges {
  /**
   * List of statuses used in the release
   */
  @Input() statusList: (Partial<Status> & { tasks?: Task[] })[] = [
    {
      id: 3,
      name: 'To do',
      final: false,
      begin: true,
      color: new Color('#34495e').rgbNumber(),
    },
    {
      id: 2,
      name: 'In progress',
      final: false,
      begin: false,
      color: new Color('#f39c12').rgbNumber(),
    },
    {
      id: 1,
      name: 'Done',
      final: true,
      begin: false,
      color: new Color('#2ecc71').rgbNumber(),
    },
  ];

  @Input() tasks: Partial<Task>[] = [
    ...new Array(10).fill({
      statusId: 1,
    }),
    ...new Array(5).fill({
      statusId: 2,
    }),
    ...new Array(16).fill({
      statusId: 3,
    }),
  ];

  public progress: {
    [statusId: number]: {
      total: number;
      percentage: number;
      color: Color;
      final: boolean;
    };
  } = {};

  public finalPercentage = 0;

  public detailsOpen = false;

  public detailsPositionPairs: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 15,
    },
  ];

  ngOnInit(): void {
    this.progress = this.calculateProgress(this.tasks);
    this.finalPercentage = this.calculateFinalPercentage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks'] || changes['statusList']) {
      this.progress = this.calculateProgress(this.tasks);
      this.finalPercentage = this.calculateFinalPercentage();
    }
  }

  private calculateProgress(allTasks: Partial<Task>[]) {
    return mapValues(groupBy(this.tasks, 'statusId'), (tasks) => ({
      total: tasks.length,
      percentage: (tasks.length / allTasks.length) * 100,
      color: new Color(this.statusList.find((status) => status.id === tasks[0].statusId)!.color),
      final: this.statusList.find((status) => status.id === tasks[0].statusId)!.final!,
    }));
  }

  private calculateFinalPercentage() {
    return Math.round(
      Object.values(this.progress)
        .filter((p) => p.final)
        .reduce((acc, { percentage }) => acc + percentage, 0),
    );
  }

  /**
   * Show release details in overlay
   */
  showDetails() {
    this.detailsOpen = true;
  }

  /**
   * Hide release details in overlay
   */
  hideDetails() {
    this.detailsOpen = false;
  }
}
