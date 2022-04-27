import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Workspace } from 'src/app/dashboard/interfaces/workspace.interface';
import { WorkspaceService } from 'src/app/dashboard/services/workspace.service';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent implements OnInit {
  @Input()
  public icon!: String;

  public workspaceList?: Observable<Workspace[]>;

  constructor(private workspaceService: WorkspaceService) {
    this.workspaceList = this.workspaceService.list();
  }

  ngOnInit() {}
}
