import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Workspace } from 'src/app/dashboard/interfaces/workspace.interface';
import { WorkspaceService } from '@dashboard/services/workspace/workspace.service';
import {
  faArrowRightArrowLeft,
  faCalendarDay,
  faHashtag,
  faLayerGroup,
  faMessage,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent {
  @Input() public icon!: String;

  public workspaceList$?: Observable<Workspace[]>;

  @HostBinding('class.collapsed')
  public isCollapsed = true;

  /** @ignore */
  faArrowRightArrowLeft = faArrowRightArrowLeft;

  /** @ignore */
  faCalendarDay = faCalendarDay;

  /** @ignore */
  faMessage = faMessage;

  /** @ignore */
  faLayerGroup = faLayerGroup;

  /** @ignore */
  faPlus = faPlus;

  /** @ignore */
  faHashtag = faHashtag;

  createWorkspace() {
    this.router.navigate(['/', 'workspaces', 'create']);
  }

  constructor(private workspaceService: WorkspaceService, private router: Router) {
    this.workspaceList$ = this.workspaceService.list();
  }

  toggle() {
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  collapse() {
    this.isCollapsed = true;
  }

  expand() {
    this.isCollapsed = false;
  }
}
