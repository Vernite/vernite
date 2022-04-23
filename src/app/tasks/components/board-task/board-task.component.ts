import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent implements OnInit {
  @Input()
  public task!: Task;

  constructor() {}

  ngOnInit() {}
}
