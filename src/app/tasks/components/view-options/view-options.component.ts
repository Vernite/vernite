import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilter, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Filter } from '@main/interfaces/filters.interface';

@Component({
  selector: 'app-view-options',
  templateUrl: './view-options.component.html',
  styleUrls: ['./view-options.component.scss'],
})
export class ViewOptionsComponent {
  penToSquare = faPenToSquare;
  faGithub = faGithub;
  filter = faFilter;

  public workspaceId: number;
  public projectId: number;

  @Input()
  project!: Project;

  @Input()
  filters: Filter[] = [];

  @Input()
  public filtersControl = new FormControl();

  public isFiltersOpen = false;

  constructor(private activatedRoute: ActivatedRoute) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;

    this.workspaceId = workspaceId;
    this.projectId = projectId;
  }
}
