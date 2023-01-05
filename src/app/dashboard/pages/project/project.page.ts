import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { ProjectService } from '@dashboard/services/project/project.service';
import { Sprint } from '@tasks/interfaces/sprint.interface';
import { SprintService } from '@tasks/services/sprint.service';
import { Observable, EMPTY } from 'rxjs';

/**
 * Project page component
 */
@Component({
  selector: 'project-page',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {
  /** Project ID */
  projectId!: number;

  /** Project object */
  project$: Observable<Project | undefined> = EMPTY;

  /** Active sprint object */
  activeSprint$: Observable<Sprint | undefined> = EMPTY;

  constructor(
    private sprintService: SprintService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ projectId }) => {
      this.projectId = projectId;
      this.activeSprint$ = this.sprintService.getActiveSprint(projectId);
      this.project$ = this.projectService.get(projectId);
    });
  }
}
