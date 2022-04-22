import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/_main/services/api.service';
import { UserService } from 'src/app/_main/services/user.service';
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
  constructor(private apiService: ApiService, private userService: UserService) {}

  /**
   * Gets a workspace by its ID.
   * @param id identifier of the workspace to get from the API
   * @returns Request observable, which completes when request is finished
   */
  public get(id: number): Observable<Workspace> {
    const userId = this.userService.userId;
    return this.apiService.get(`/user/${userId}/workspace/${id}/`);
  }

  /**
   * Deletes the workspaces by its ID.
   * @param id identifier of the workspace to delete from the API
   * @returns Request observable, which completes when request is finished
   */
  public delete(id: number): Observable<null> {
    const userId = this.userService.userId;
    return this.apiService.delete(`/user/${userId}/workspace/${id}/`);
  }

  /**
   * Updates a workspace.
   * @param workspace workspace object to update in the API
   * @returns Request observable, which completes when request is finished
   */
  public update(workspace: Workspace): Observable<Workspace> {
    const userId = this.userService.userId;
    return this.apiService.patch(`/user/${userId}/workspace/${workspace.id}/`, { body: workspace });
  }

  /**
   * Lists all available workspaces.
   * @returns Request observable, which completes when request is finished
   */
  public list(): Observable<Workspace[]> {
    const userId = this.userService.userId;
    return this.apiService.get(`/user/${userId}/workspace/`);
  }

  /**
   * Creates a new workspace.
   * @param workspace workspace to modify
   * @returns Request observable, which completes when request is finished
   */
  public create(workspace: Workspace): Observable<Workspace> {
    const userId = this.userService.userId;
    return this.apiService.post(`/user/${userId}/workspace/`, { body: workspace });
  }
}
