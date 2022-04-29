import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent {
  @Input()
  public task!: Task;

  constructor() {}
}
