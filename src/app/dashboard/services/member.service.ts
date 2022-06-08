import { Injectable } from '@angular/core';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { Service } from '@main/decorators/service.decorator';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/_main/services/api.service';

@Service()
@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private apiService: ApiService) {}

  /**
   * Lists members in given project
   * @param projectId project which are members from
   * @returns Request observable, which completes when request is finished
   */
  public list(projectId: number): Observable<ProjectMember[]> {
    return this.apiService.get(`/project/${projectId}/member`);
  }

  /**
   * Removes members from project
   * @param projectId project which are members from
   * @param id list of member ids to remove from project
   * @returns Request observable, which completes when request is finished
   */
  public remove(projectId: number, id: number[]): Observable<ProjectMember[]> {
    return this.apiService.put(`/project/${projectId}/member`, { body: id });
  }

  /**
   * Let member leave project.
   * @param projectId project which are members from
   * @param id id of the member who will leave the project
   * @returns Request observable, which completes when request is finished
   */
  public leave(projectId: number, id: number): Observable<null> {
    return this.apiService.delete(`/project/${projectId}/member`, { body: id });
  }

  /**
   * Adds members to projects.
   * @param emails emails of people to add
   * @param projectList projects where people will be added
   * @returns Request observable, which completes when request is finished
   */
  public add(
    emails: string[],
    projectList: number[],
  ): Observable<{ emails: string[]; projectList: number[] }> {
    return this.apiService.post(`/project/member`, { body: { emails, projectList } });
  }
}
