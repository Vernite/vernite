import { Injectable, Injector } from '@angular/core';
import { BaseService } from '@main/services/base/base.service';
import { Service } from '../../../_main/decorators/service/service.decorator';
import { Errors } from '../../../_main/interfaces/http-error.interface';
import { ApiService } from '../../../_main/services/api/api.service';
import { Comment } from '@tasks/interfaces/comment.interface';

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

  public list(projectId: number, taskId: number) {
    return this.apiService.get<Comment[]>(`/project/${projectId}/task/${taskId}/comment`).pipe(
      this.validate({
        404: 'PROJECT_OR_TASK_NOT_FOUND',
      }),
    );
  }

  public get(projectId: number, taskId: number, commentId: number) {
    return this.apiService
      .get<Comment>(`/project/${projectId}/task/${taskId}/comment/${commentId}`)
      .pipe(
        this.validate({
          404: 'PROJECT_OR_TASK_NOT_FOUND',
        }),
      );
  }

  public create(projectId: number, taskId: number, data: { content: string }) {
    return this.apiService
      .post<Comment>(`/project/${projectId}/task/${taskId}/comment`, { body: data })
      .pipe(
        this.validate({
          404: 'PROJECT_OR_TASK_NOT_FOUND',
        }),
      );
  }

  public update(projectId: number, taskId: number, comment: Comment) {
    return this.apiService
      .put<Comment>(`/project/${projectId}/task/${taskId}/comment/${comment.id}`, { body: comment })
      .pipe(
        this.validate({
          404: 'PROJECT_OR_TASK_NOT_FOUND',
        }),
      );
  }

  public delete(projectId: number, taskId: number, commentId: number) {
    return this.apiService.delete(`/project/${projectId}/task/${taskId}/comment/${commentId}`).pipe(
      this.validate({
        404: 'PROJECT_OR_TASK_NOT_FOUND',
      }),
    );
  }
}
