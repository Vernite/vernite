import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { faFilter, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-options',
  templateUrl: './view-options.component.html',
  styleUrls: ['./view-options.component.scss'],
})
export class ViewOptionsComponent {
  penToSquare = faPenToSquare;
  filter = faFilter;

  public workspaceId: number;
  public projectId: number;

  @Input()
  project!: Project;

  @Input()
  title!: string;

  constructor(private activatedRoute: ActivatedRoute) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;

    this.workspaceId = workspaceId;
    this.projectId = projectId;
  }
}
