import { Injectable, Injector } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '@main/services/api/api.service';
import { Workspace } from '../../interfaces/workspace.interface';
import { BaseService } from '@main/services/base/base.service';
import { Errors } from '@main/interfaces/http-error.interface';
import { Cache } from '@main/decorators/cache/cache.decorator';

/**
 * Workspaces management service
 */
@Injectable({
  providedIn: 'root',
})
export class WorkspaceService extends BaseService<
  Errors<'WORKSPACE_NOT_FOUND' | 'FORM_NOT_VALID' | 'WORKSPACE_NOT_EMPTY'>
> {
  protected override errorCodes = {
    WORKSPACE_NOT_FOUND: {
      message: $localize`Workspace not found`,
    },
    FORM_NOT_VALID: {
      message: $localize`Some required fields in form are missing`,
    },
    WORKSPACE_NOT_EMPTY: {
      message: $localize`Workspace is not empty`,
    },
  };

  constructor(private injector: Injector, private apiService: ApiService) {
    super(injector);
  }

  /**
   * Gets a workspace by its ID.
   * @param id identifier of the workspace to get from the API
   * @returns Request observable, which completes when request is finished
   */
  @Cache()
  public get(id: number): Observable<Workspace> {
    return this.apiService.get(`/workspace/${id}`).pipe(
      this.validate({
        404: 'WORKSPACE_NOT_FOUND',
      }),
    );
  }

  /**
   * Deletes the workspace by its ID.
   * @param id identifier of the workspace to delete from the API
   * @returns Request observable, which completes when request is finished
   */
  public delete(id: number): Observable<null> {
    return this.apiService.delete(`/workspace/${id}`).pipe(
      this.validate({
        400: 'WORKSPACE_NOT_EMPTY',
        404: 'WORKSPACE_NOT_FOUND',
      }),
    );
  }

  /**
   * Updates a workspace.
   * @param workspace workspace object to update in the API
   * @returns Request observable, which completes when request is finished
   */
  public update(workspace: Partial<Workspace>): Observable<Workspace> {
    return this.apiService.put(`/workspace/${workspace.id}`, { body: workspace }).pipe(
      this.validate({
        400: 'FORM_NOT_VALID',
        404: 'WORKSPACE_NOT_FOUND',
      }),
    );
  }

  /**
   * Lists all available workspaces.
   * @returns Request observable, which completes when request is finished
   */
  @Cache()
  public list(): Observable<Workspace[]> {
    return this.apiService.get(`/workspace`).pipe(this.validate());
  }

  /**
   * Creates a new workspace.
   * @param workspace workspace options to create in the API
   * @returns Request observable, which completes when request is finished
   */
  public create(workspace: { name: string }): Observable<Workspace> {
    return this.apiService.post(`/workspace`, { body: workspace }).pipe(
      this.validate({
        400: 'FORM_NOT_VALID',
      }),
    );
  }

  /**
   * Gets workspace object by project ID.
   * @param projectId Project ID to find the workspace for
   * @returns Observable that emits the workspace for the given project ID
   */
  public getWorkspaceByProjectId(projectId: number): Observable<Workspace> {
    return this.list().pipe(
      map((workspaces) => {
        const workspace = workspaces.find((w) =>
          w.projectsWithPrivileges.some((p) => p.project.id === projectId),
        );
        if (!workspace) {
          throw new Error('Workspace not found');
        }
        return workspace;
      }),
    );
  }
}
