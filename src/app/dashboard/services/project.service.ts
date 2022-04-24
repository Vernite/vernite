import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/_main/services/api.service';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private apiService: ApiService) {}

  public get(projectId: number) {
    return this.apiService.get(`/project/${projectId}`);
  }

  public create(project: { name: string; workspaceId: number }) {
    return this.apiService.post('/project/', { body: project });
  }

  public update(project: Project) {
    return this.apiService.put(`/project/${project.id}`, { body: project });
  }
}
