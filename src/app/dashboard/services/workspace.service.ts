import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/_main/services/api.service';
import { Workspace } from '../interfaces/workspace.interface';

/**
 * Workspaces management service
 */
@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  /**
   * Default constructor with `ApiService` dependency.
   * @param apiService Api service
   */
  constructor(private apiService: ApiService) {}

  /**
   * Creates a new workspace.
   * @param workspace workspace to modify
   * @returns Request observable, which completes when request is finished
   */
  public create(workspace: Workspace) {
    return this.apiService.post('/workspaces', { body: workspace });
  }

  /**
   * Lists all available workspaces.
   * @returns Request observable, which completes when request is finished
   */
  public list() {
    return this.apiService.get('/workspaces');
  }

  /**
   * Gets a workspace by its ID.
   * @param id identifier of the workspace to get from the API
   * @returns Request observable, which completes when request is finished
   */
  public get(id: number) {
    return this.apiService.get(`/workspaces/${id}`);
  }

  /**
   * Updates a workspace.
   * @param workspace workspace object to update in the API
   * @returns Request observable, which completes when request is finished
   */
  public update(workspace: Workspace) {
    return this.apiService.patch(`/workspaces/${workspace.id}`, { body: workspace });
  }

  /**
   * Deletes the workspaces by its ID.
   * @param id identifier of the workspace to delete from the API
   * @returns Request observable, which completes when request is finished
   */
  public delete(id: number) {
    return this.apiService.delete(`/workspaces/${id}`);
  }
}
