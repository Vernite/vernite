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
  @Input() statusList!: Status[];

  /**
   * List of tasks in the release
   */
  @Input() tasks!: Task[];

  /**
   * Progress of the release
   */
  public progress: {
    [statusId: number]: {
      /** Total numbers of tasks */
      total: number;
      /** Percentage of tasks */
      percentage: number;
      /** Color of the status */
      color: Color;
      /** Is the status final */
      final: boolean;
    };
  } = {};

  /** Final release percentage */
  public finalPercentage = 0;

  /** Is details overlay open */
  public detailsOpen = false;

  /** Available positions for details overlay */
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

  /**
   * Calculate progress of the release
   * @param allTasks All tasks in the release
   * @returns Progress of the release
   */
  private calculateProgress(allTasks: Partial<Task>[]) {
    const values = mapValues(groupBy(this.tasks, 'statusId'), (tasks) => ({
      total: tasks.length,
      percentage: (tasks.length / allTasks.length) * 100,
      color: new Color(this.statusList.find((status) => status.id === tasks[0].statusId)!.color),
      final: this.statusList.find((status) => status.id === tasks[0].statusId)!.final!,
    }));

    for (const status of this.statusList) {
      if (!values[status.id!]) {
        values[status.id!] = {
          total: 0,
          percentage: 0,
          color: new Color(status.color),
          final: status.final,
        };
      }
    }

    return values;
  }

  /**
   * Calculate final percentage of the release
   * @returns Final percentage of the release
   */
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
