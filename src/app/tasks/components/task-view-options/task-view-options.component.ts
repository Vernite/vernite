import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilter, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Filter } from '@main/interfaces/filters.interface';
import { SprintService } from '@tasks/services/sprint.service';

@Component({
  selector: 'app-task-view-options',
  templateUrl: './task-view-options.component.html',
  styleUrls: ['./task-view-options.component.scss'],
})
export class TaskViewOptionsComponent implements OnInit {
  penToSquare = faPenToSquare;
  faGithub = faGithub;
  filter = faFilter;

  public sprintId: number;
  public projectId: number;

  public inSprint: boolean = false;

  @Input()
  project!: Project;

  @Input()
  filters: Filter[] = [];

  @Input()
  public filtersControl = new FormControl();

  public isFiltersOpen = false;

  constructor(private activatedRoute: ActivatedRoute, private sprintService: SprintService) {
    const { sprintId, projectId } = this.activatedRoute.snapshot.params;

    this.sprintId = sprintId;
    this.projectId = projectId;
  }

  openDialog() {
    this.sprintService.openCreateSprintDialog().subscribe(() => {
      location.reload();
    });
  }

  ngOnInit() {
    if (location.href.includes('sprint')) {
      this.inSprint = true;
    }
  }
}
