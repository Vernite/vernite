import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/_main/services/api.service';
import { Workspace } from '../interfaces/workspace.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private apiService: ApiService) {}

  public create(workspace: Workspace) {
    return this.apiService.post('/workspaces', { body: workspace });
  }

  public list() {
    return this.apiService.get('/workspaces');
  }

  public get(id: number) {
    return this.apiService.get(`/workspaces/${id}`);
  }

  public update(workspace: Workspace) {
    return this.apiService.patch(`/workspaces/${workspace.id}`, { body: workspace });
  }

  public delete(id: number) {
    return this.apiService.delete(`/workspaces/${id}`);
  }
}
