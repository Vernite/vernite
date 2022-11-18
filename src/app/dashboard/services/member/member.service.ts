import { Injectable, Injector } from '@angular/core';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { map, Observable } from 'rxjs';
import { ApiService } from '@main/services/api/api.service';
import { Service } from '@main/decorators/service/service.decorator';
import { BaseService } from '@main/services/base/base.service';
import { Errors } from '@main/interfaces/http-error.interface';
import { Cache } from '@main/decorators/cache/cache.decorator';

@Service()
@Injectable({
  providedIn: 'root',
})
export class MemberService extends BaseService<
  Errors<'NOT_ENOUGH_PRIVILEGES' | 'PROJECT_NOT_FOUND'>
> {
  protected override errorCodes = {
    NOT_ENOUGH_PRIVILEGES: {
      message: $localize`You don't have enough privileges to do this`,
    },
    PROJECT_NOT_FOUND: {
      message: $localize`Project not found`,
    },
  };

  constructor(private injector: Injector, private apiService: ApiService) {
    super(injector);
  }

  /**
   * Lists members in given project
   * @param projectId project which are members from
   * @returns Request observable, which completes when request is finished
   */
  @Cache()
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
    return this.apiService.put(`/project/${projectId}/member`, { body: id }).pipe(
      this.validate({
        403: 'NOT_ENOUGH_PRIVILEGES',
        404: 'PROJECT_NOT_FOUND',
      }),
    );
  }

  /**
   * Let member leave project.
   * @param projectId project which are members from
   * @param id id of the member who will leave the project
   * @returns Request observable, which completes when request is finished
   */
  public leave(projectId: number): Observable<null> {
    return this.apiService.delete(`/project/${projectId}/member`).pipe(
      this.validate({
        404: 'PROJECT_NOT_FOUND',
      }),
    );
  }

  /**
   * Adds members to projects.
   * @param emails emails of people to add
   * @param projectList projects where people will be added
   * @returns Request observable, which completes when request is finished
   */
  public add(
    emails: string[],
    projects: number[],
  ): Observable<{ emails: string[]; projectList: number[] }> {
    return this.apiService.post(`/project/member`, { body: { emails, projects } });
  }

  /**
   * Creates members map from given project
   * @param projectId project which are members from
   * @returns Request observable, which completes when request is finished
   */
  public map(projectId: number): Observable<Map<number, ProjectMember>> {
    return this.list(projectId).pipe(
      map((members) =>
        members.reduce((acc: Map<number, ProjectMember>, member: ProjectMember) => {
          acc.set(member.user.id, member);
          return acc;
        }, new Map<number, ProjectMember>()),
      ),
    );
  }
}
