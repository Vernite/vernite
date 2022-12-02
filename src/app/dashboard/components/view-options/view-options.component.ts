import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-options',
  templateUrl: './view-options.component.html',
  styleUrls: ['./view-options.component.scss'],
})
export class ViewOptionsComponent implements OnInit {
  penToSquare = faPenToSquare;
  faGithub = faGithub;

  public workspaceId!: number;
  public projectId!: number;

  @Input()
  project!: Project;

  @Input()
  activeSprintId?: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ workspaceId, projectId }) => {
      this.workspaceId = workspaceId;
      this.projectId = projectId;
    });
  }
}
