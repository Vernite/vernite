import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks.routing';
import { BoardPage } from './pages/board/board.page';
import { BoardTaskComponent } from './components/board-task/board-task.component';
import { MainModule } from '../_main/_main.module';

@NgModule({
  imports: [CommonModule, MainModule, TasksRoutingModule],
  declarations: [BoardPage, BoardTaskComponent],
})
export class TasksModule {}
