import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ProjectForm } from '@dashboard/interfaces/project-form.interface';
import { Project } from '@dashboard/interfaces/project.interface';
import { faGripLines, faPlus, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Status } from '@tasks/interfaces/status.interface';
import { StatusService } from '@tasks/services/status/status.service';
import { isEqual } from 'lodash-es';
import { map, of, switchMap, tap, Observable, forkJoin, defaultIfEmpty } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'project-form-statuses',
  templateUrl: './project-form-statuses.component.html',
  styleUrls: ['./project-form-statuses.component.scss'],
})
export class ProjectFormStatusesComponent implements ProjectForm, OnInit {
  @Input() project?: Project;

  public displayedColumns = ['name', 'begin', 'final', 'color', 'grip', 'action'];

  public statusList: Status[] = [];
  public currentStatusList: Status[] = [];

  /** @ignore */
  faGripLines = faGripLines;

  /** @ignore */
  faPlus = faPlus;

  /** @ignore */
  faCheck = faCheck;

  /** @ignore */
  faXmark = faXmark;

  constructor(private statusService: StatusService) {}

  ngOnInit() {
    if (this.project) {
      this.statusService
        .list(this.project.id)
        .pipe(untilDestroyed(this))
        .subscribe((statusList) => {
          if (!statusList || statusList.length === 0) {
            this.statusList = this.statusService.getDefaultStatusList();
          }

          this.statusList = statusList;
          this.currentStatusList = JSON.parse(JSON.stringify(statusList));
        });
    } else {
      this.statusList = this.statusService.getDefaultStatusList();
    }
  }

  public save() {
    if (!this.project) return of();

    return of(null).pipe(
      // Save all new statuses
      switchMap(() =>
        forkJoin(
          this.statusList
            .filter((status) => !status.id)
            .map((status) => this.statusService.create(this.project!.id, status)),
        ).pipe(defaultIfEmpty([])),
      ),

      // Update all existing statuses
      switchMap(() =>
        forkJoin(
          this.statusList
            .filter(
              (status) =>
                status.id &&
                !isEqual(
                  status,
                  this.currentStatusList.find((s) => s.id === status.id),
                ),
            )
            .map((status) => this.statusService.update(this.project!.id, status)),
        ).pipe(defaultIfEmpty([])),
      ),

      map(() => this.project!),
    ) as Observable<Project>;
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.statusList, event.previousIndex, event.currentIndex);
    this.statusList = [...this.statusList];
    this.updateOrdinals();
  }

  public updateOrdinals() {
    for (const [index, status] of this.statusList.entries()) {
      status.ordinal = index;
    }
  }

  public createNewStatus() {
    this.statusService
      .openCreateNewStatusDialog()
      .pipe(
        untilDestroyed(this),
        tap((status) => (this.statusList = [...this.statusList, status])),
        tap(() => this.updateOrdinals()),
      )
      .subscribe();
  }

  public editStatus(status: Status) {
    this.statusService
      .openEditStatusDialog(status)
      .pipe(
        untilDestroyed(this),
        tap((status) => {
          this.statusList = this.statusList.map((s) => (s.ordinal === status.ordinal ? status : s));
        }),
      )
      .subscribe();
  }
}
