import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '@tasks/services/comment/comment.service';
import { FormGroup, FormControl } from '@ngneat/reactive-forms';
import { requiredValidator } from '../../../_main/validators/required.validator';
import { EMPTY, Observable } from 'rxjs';
import { Comment } from '../../interfaces/comment.interface';
import { lengthValidator } from '@main/validators/length.validator';
import { notEmptyValidator } from '@main/validators/not-empty.validator';

/**
 * Component to display comments for task
 */
@Component({
  selector: 'task-comments',
  templateUrl: './task-comments.component.html',
  styleUrls: ['./task-comments.component.scss'],
})
export class TaskCommentsComponent implements OnInit {
  /** Id of the project */
  @Input() projectId!: number;

  /** Id of the task */
  @Input() taskId!: number;

  /** List of comments */
  public comments$: Observable<Comment[]> = EMPTY;

  /** Form to create new comment */
  public form = new FormGroup({
    content: new FormControl('', [
      requiredValidator(),
      lengthValidator(1, 1000),
      notEmptyValidator(),
    ]),
  });

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.comments$ = this.commentService.list(this.projectId, this.taskId);
  }

  /**
   * Send comment
   */
  sendComment() {
    if (this.form.valid) {
      this.commentService.create(this.projectId, this.taskId, this.form.value).subscribe(() => {
        this.form.reset();
        location.reload();
      });
    }
  }
}
