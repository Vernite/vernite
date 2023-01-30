import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilter, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { SprintService } from '@tasks/services/sprint.service';

/**
 * Component to display task view options like view switcher (board/list)
 */
@Component({
  selector: 'app-task-view-options',
  templateUrl: './task-view-options.component.html',
  styleUrls: ['./task-view-options.component.scss'],
})
export class TaskViewOptionsComponent implements OnInit {
  /** @ignore */
  penToSquare = faPenToSquare;

  /** @ignore */
  faGithub = faGithub;

  /** @ignore */
  filter = faFilter;

  /** Id of the project */
  public projectId: number;

  /** If we are in sprint view */
  public inSprint: boolean = false;

  /** Project */
  @Input() project!: Project;

  constructor(private activatedRoute: ActivatedRoute, private sprintService: SprintService) {
    const { projectId } = this.activatedRoute.snapshot.params;

    this.projectId = projectId;
  }

  /**
   * Open dialog to create new sprint
   */
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
