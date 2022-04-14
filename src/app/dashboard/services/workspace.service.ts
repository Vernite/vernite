import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/_main/services/api.service';
import { Workspace } from '../interfaces/workspace.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private apiService: ApiService) {}

  public create(workspace: Workspace) {
    this.apiService.post('/workspaces', { body: workspace }).subscribe((response) => {
      console.log(response);
    });
  }

  public list() {
    this.apiService.get('/workspaces').subscribe((response) => {
      console.log(response);
    });
  }

  public get(id: string) {
    this.apiService.get(`/workspaces/${id}`).subscribe((response) => {
      console.log(response);
    });
  }

  public update(workspace: Workspace) {
    this.apiService
      .put(`/workspaces/${workspace.id}`, { body: workspace })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
