import { Injectable, Injector } from '@angular/core';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { map, Observable } from 'rxjs';
import { ApiService } from '@main/services/api/api.service';
import { Project } from '../../interfaces/project.interface';
import { Service } from '@main/decorators/service/service.decorator';
import { Errors } from '@main/interfaces/http-error.interface';
import { BaseService } from '@main/services/base/base.service';
import { WorkspaceService } from '@dashboard/services/workspace/workspace.service';
import { Cache } from '@main/decorators/cache/cache.decorator';
import { unixTimestamp } from '@main/interfaces/date.interface';
import { AuditLog } from '../../../_main/modules/audit-log/interfaces/audit-log.interface';
import { Task } from '@tasks/interfaces/task.interface';

@Service()
@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService<
  Errors<'PROJECT_NOT_FOUND' | 'WORKSPACE_NOT_FOUND' | 'FORM_VALIDATION_ERROR'>
> {
  protected override errorCodes = {
    PROJECT_NOT_FOUND: {
      message: $localize`Project not found`,
    },
    WORKSPACE_NOT_FOUND: {
      message: $localize`Workspace not found`,
    },
    FORM_VALIDATION_ERROR: {
      message: $localize`Form validation error`,
    },
  };

  constructor(
    private injector: Injector,
    private apiService: ApiService,
    private workspaceService: WorkspaceService,
  ) {
    super(injector);
  }

  /**
   * Gets a project by its ID.
   * @param projectId identifier of the project to get from the API
   * @returns Request observable, which completes when request is finished
   * @throws HTTPError with `404` status if the project does not exist
   */
  @Cache()
  public get(projectId: number): Observable<Project> {
    return this.apiService.get(`/project/${projectId}`).pipe(
      this.validate({
        404: 'PROJECT_NOT_FOUND',
      }),
    );
  }

  /**
   * Deletes the project by its ID.
   * @param projectId identifier of the project to delete from the API
   * @returns Request observable, which completes when request is finished
   * @throws HTTPError with `404` status if the project does not exist
   */
  public delete(projectId: number): Observable<void> {
    return this.apiService.delete(`/project/${projectId}`).pipe(
      this.validate({
        404: 'PROJECT_NOT_FOUND',
      }),
    );
  }

  /**
   * Updates a project.
   * @param project project object to update in the API
   * @returns Request observable, which completes when request is finished
   * @throws HTTPError with `404` status if the project does not exist
   */
  public update(project: Partial<Project> & { id: number }): Observable<Project> {
    return this.apiService.put(`/project/${project.id}`, { body: project }).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
        404: 'PROJECT_NOT_FOUND',
      }),
    );
  }

  /**
   * Creates a new project.
   * @param project project to add
   * @returns Request observable, which completes when request is finished
   */
  public create(project: { name: string; workspaceId: number }): Observable<Project> {
    return this.apiService.post('/project', { body: project }).pipe(
      this.validate({
        400: 'FORM_VALIDATION_ERROR',
        404: 'WORKSPACE_NOT_FOUND',
      }),
    );
  }

  /**
   * List all available projects
   */
  public list(): Observable<Project[]> {
    return this.workspaceService.list().pipe(
      map((workspaces) =>
        workspaces.reduce((projects: Project[], workspace: Workspace) => {
          projects.push(...workspace.projects);
          return projects;
        }, []),
      ),
    );
  }

  /**
   * List all events for a project
   * @param projectId id of the project to get events from
   * @param from starting date
   * @param to ending date
   * @returns Observable with list of all events
   */
  @Cache()
  public events(projectId: number, from: unixTimestamp, to: unixTimestamp): Observable<any> {
    return this.apiService.get(`/project/${projectId}/events`, {
      params: { from, to },
    });
  }

  /**
   * Save logo for a project
   * @param projectId id of the project to save logo for
   * @param file file to save as logo
   * @returns empty request observable
   */
  public saveLogo(projectId: number, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);

    return this.apiService.post(`/project/${projectId}/logo`, { body: formData });
  }

  /**
   * Delete logo for a project
   * @param projectId id of the project to delete logo for
   * @returns empty request observable
   */
  public deleteLogo(projectId: number): Observable<void> {
    return this.apiService.delete(`/project/${projectId}/logo`);
  }

  /**
   * Get audit log for a project (changes history)
   * @param projectId id of the project to get audit log for
   * @returns Observable with audit log
   */
  @Cache()
  public auditLog(projectId: number): Observable<AuditLog<Task>[]> {
    return this.apiService.get<AuditLog<Task>[]>(`/project/${projectId}/auditlog`).pipe(
      map((auditLogs) =>
        auditLogs.map((log) => ({
          ...log,
          projectId,
        })),
      ),
    );
  }
}
