import { Injectable, Injector } from '@angular/core';
import { BaseService } from '@main/services/base/base.service';
import { Service } from '../../../_main/decorators/service/service.decorator';
import { Errors } from '../../../_main/interfaces/http-error.interface';
import { ApiService } from '../../../_main/services/api/api.service';
import { Comment } from '@tasks/interfaces/comment.interface';

/** Service to integrate tasks comments with API */
@Service()
@Injectable({
  providedIn: 'root',
})
export class CommentService extends BaseService<Errors<'PROJECT_OR_TASK_NOT_FOUND'>> {
  protected errorCodes = {
    PROJECT_OR_TASK_NOT_FOUND: {
      message: $localize`Project or task not found`,
    },
  };

  constructor(private injector: Injector, private apiService: ApiService) {
    super(injector);
  }

  /**
   * List comments
   * @param projectId project id
   * @param taskId task id
   * @returns comments list
   */
  public list(projectId: number, taskId: number) {
    return this.apiService.get<Comment[]>(`/project/${projectId}/task/${taskId}/comment`).pipe(
      this.validate({
        404: 'PROJECT_OR_TASK_NOT_FOUND',
      }),
    );
  }

  /**
   * Get comment
   * @param projectId project id
   * @param taskId task id
   * @param commentId comment id
   * @returns comment
   */
  public get(projectId: number, taskId: number, commentId: number) {
    return this.apiService
      .get<Comment>(`/project/${projectId}/task/${taskId}/comment/${commentId}`)
      .pipe(
        this.validate({
          404: 'PROJECT_OR_TASK_NOT_FOUND',
        }),
      );
  }

  /**
   * Create comment
   * @param projectId project id
   * @param taskId task id
   * @param data comment data
   * @returns comment
   */
  public create(projectId: number, taskId: number, data: { content: string }) {
    return this.apiService
      .post<Comment>(`/project/${projectId}/task/${taskId}/comment`, { body: data })
      .pipe(
        this.validate({
          404: 'PROJECT_OR_TASK_NOT_FOUND',
        }),
      );
  }

  /**
   * Update comment
   * @param projectId project id
   * @param taskId task id
   * @param comment comment
   * @returns comment
   */
  public update(projectId: number, taskId: number, comment: Comment) {
    return this.apiService
      .put<Comment>(`/project/${projectId}/task/${taskId}/comment/${comment.id}`, { body: comment })
      .pipe(
        this.validate({
          404: 'PROJECT_OR_TASK_NOT_FOUND',
        }),
      );
  }

  /**
   * Delete comment
   * @param projectId project id
   * @param taskId task id
   * @param commentId comment id
   * @returns delete response observable
   */
  public delete(projectId: number, taskId: number, commentId: number) {
    return this.apiService.delete(`/project/${projectId}/task/${taskId}/comment/${commentId}`).pipe(
      this.validate({
        404: 'PROJECT_OR_TASK_NOT_FOUND',
      }),
    );
  }
}
