import { Injectable } from '@angular/core';
import { ServiceValidator } from '@main/decorators/service-validator.decorator';
import { Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/_main/services/api.service';
import { Workspace } from '../interfaces/workspace.interface';

/**
 * Workspaces management service
 */
@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  listSubject$ = new Subject<Workspace[]>();

  /**
   * Default constructor with `ApiService` dependency.
   * @param apiService Api service
   */
  constructor(private apiService: ApiService) {}

  /**
   * Gets a workspace by its ID.
   * @param id identifier of the workspace to get from the API
   * @returns Request observable, which completes when request is finished
   */
  public get(id: number): Observable<Workspace> {
    return this.apiService.get(`/workspace/${id}`).pipe(this.validate('GET'));
  }

  /**
   * Deletes the workspace by its ID.
   * @param id identifier of the workspace to delete from the API
   * @returns Request observable, which completes when request is finished
   */
  public delete(id: number): Observable<null> {
    return this.apiService.delete(`/workspace/${id}`).pipe(this.validate('DELETE'));
  }

  /**
   * Updates a workspace.
   * @param workspace workspace object to update in the API
   * @returns Request observable, which completes when request is finished
   */
  public update(workspace: Workspace): Observable<Workspace> {
    return this.apiService.put(`/workspace/${workspace.id}`, { body: workspace });
  }

  /**
   * Lists all available workspaces.
   * @returns Request observable, which completes when request is finished
   */
  public list(): Observable<Workspace[]> {
    return this.apiService.get(`/workspace`);
  }

  /**
   * Creates a new workspace.
   * @param workspace workspace to modify
   * @returns Request observable, which completes when request is finished
   */
  public create(workspace: Workspace): Observable<Workspace> {
    return this.apiService.post(`/workspace`, { body: workspace });
  }

  @ServiceValidator({
    DELETE: {
      400: $localize`Workspace is not empty. Only empty workspaces can be deleted.`,
    },
    GET: {
      404: $localize`Workspace with this ID does not exist.`,
    },
  })
  private validate(identifier: string): any {}
}
