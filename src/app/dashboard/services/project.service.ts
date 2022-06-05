import { Injectable } from '@angular/core';
import { Workspace } from '@dashboard/interfaces/workspace.interface';
import { Service } from '@main/decorators/service.decorator';
import { map } from 'rxjs';
import { ApiService } from 'src/app/_main/services/api.service';
import { Project } from '../interfaces/project.interface';

@Service()
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private apiService: ApiService) {}

  /**
   * Gets a project by its ID.
   * @param projectId identifier of the project to get from the API
   * @returns Request observable, which completes when request is finished
   */
  public get(projectId: number) {
    return this.apiService.get(`/project/${projectId}`);
  }

  /**
   * Deletes the project by its ID.
   * @param projectId identifier of the project to delete from the API
   * @returns Request observable, which completes when request is finished
   */
  public delete(projectId: number) {
    return this.apiService.delete(`/project/${projectId}`);
  }

  /**
   * Updates a project.
   * @param project project object to update in the API
   * @returns Request observable, which completes when request is finished
   */
  public update(project: Project) {
    return this.apiService.put(`/project/${project.id}`, { body: project });
  }

  /**
   * Creates a new project.
   * @param project project to add
   * @returns Request observable, which completes when request is finished
   */
  public create(project: { name: string; workspaceId: number }) {
    return this.apiService.post('/project', { body: project });
  }

  /**
   * Changes the workspace of the project.
   * @param projectId project to move
   * @param newWorkspaceId workspace where the project will be moved
   * @returns Request observable, which completes when request is finished
   */
  public changeWorkspace(projectId: number, newWorkspaceId: number) {
    return this.apiService.put(`/project/${projectId}/workspace/${newWorkspaceId}`);
  }

  /**
   * List projects in given workspace.
   */
  public list() {
    return this.apiService.get('/workspace').pipe(
      map((workspaces) =>
        workspaces.reduce((projects: any, workspace: Workspace) => {
          projects.push(...workspace.projectsWithPrivileges.map((p) => p.project));
          return projects;
        }, []),
      ),
    );
  }
}
