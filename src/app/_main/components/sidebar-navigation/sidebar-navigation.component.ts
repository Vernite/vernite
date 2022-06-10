import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Workspace } from 'src/app/dashboard/interfaces/workspace.interface';
import { WorkspaceService } from 'src/app/dashboard/services/workspace.service';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent {
  @Input()
  public icon!: String;

  public workspaceList?: Observable<Workspace[]>;

  createWorkspace() {
    this.router.navigate(['/', 'create']);
  }

  constructor(private workspaceService: WorkspaceService, private router: Router) {
    this.workspaceList = this.workspaceService.list();
  }
}
