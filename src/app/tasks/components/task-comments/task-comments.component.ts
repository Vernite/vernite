import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '@tasks/services/comment/comment.service';
import { FormGroup, FormControl } from '@ngneat/reactive-forms';
import { requiredValidator } from '../../../_main/validators/required.validator';
import { EMPTY, Observable } from 'rxjs';
import { Comment } from '../../interfaces/comment.interface';

@Component({
  selector: 'task-comments',
  templateUrl: './task-comments.component.html',
  styleUrls: ['./task-comments.component.scss'],
})
export class TaskCommentsComponent implements OnInit {
  @Input() projectId!: number;
  @Input() taskId!: number;

  public comments$: Observable<Comment[]> = EMPTY;

  public form = new FormGroup({
    content: new FormControl('', [requiredValidator()]),
  });

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.comments$ = this.commentService.list(this.projectId, this.taskId);
  }

  sendComment() {
    if (this.form.valid) {
      this.commentService.create(this.projectId, this.taskId, this.form.value).subscribe(() => {
        this.form.reset();
        location.reload();
      });
    }
  }
}
