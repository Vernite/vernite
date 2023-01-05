import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@dashboard/interfaces/project.interface';
import { ProjectService } from '@dashboard/services/project/project.service';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilter, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@ngneat/reactive-forms';
import { Observable, EMPTY } from 'rxjs';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { ProjectMember } from '../../interfaces/project-member.interface';
import { MemberService } from '@dashboard/services/member/member.service';
import { StatusService } from '@tasks/services/status/status.service';
import { Status } from '../../../tasks/interfaces/status.interface';
import { TaskFilters } from '../../../tasks/filters/task.filters';
import { FilterChannel } from '@main/components/filters/filter-channel.model';

/** Project tabs component to allow navigate over the project */
@Component({
  selector: 'app-view-options',
  templateUrl: './view-options.component.html',
  styleUrls: ['./view-options.component.scss'],
})
export class ViewOptionsComponent implements OnInit {
  /** @ignore */
  faPenToSquare = faPenToSquare;

  /** @ignore */
  faGithub = faGithub;

  /** @ignore */
  faFilter = faFilter;

  /** Id of the project we are in */
  public projectId!: number;

  /** Observable of the active project */
  public project$: Observable<Project> = EMPTY;

  /** Project members */
  public projectMembers$: Observable<ProjectMember[]> = EMPTY;

  /** Project members map */
  public statusList$: Observable<Status[]> = EMPTY;

  /** Is filters overlay open */
  isFiltersOpen = false;

  /** Filters form control */
  filtersControl = new FormControl();

  /** @ignore */
  FilterChannel = FilterChannel;

  /** Available positions for filters overlay */
  public filtersPositionPairs: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];

  /** Filters to add to list */
  public filters = {
    ASSIGNEE_ID: {
      dataFilter: TaskFilters.ASSIGNEE_ID,
      control: new FormControl<number | null | 'all'>('all'),
    },
    STATUS_IDS: {
      dataFilter: TaskFilters.STATUS_IDS,
      control: new FormControl<number[]>(undefined),
    },
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private memberService: MemberService,
    private statusService: StatusService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ projectId }) => {
      this.projectId = Number(projectId);

      this.project$ = this.projectService.get(this.projectId);
      this.projectMembers$ = this.memberService.list(this.projectId);
      this.statusList$ = this.statusService.list(this.projectId);
    });
  }
}
