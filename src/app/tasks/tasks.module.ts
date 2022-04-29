import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks.routing';
import { BoardPage } from './pages/board/board.page';
import { BoardTaskComponent } from './components/board-task/board-task.component';
import { MainModule } from '../_main/_main.module';
import { TaskDialog } from './dialogs/task/task.dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MainModule, TasksRoutingModule],
  declarations: [BoardPage, BoardTaskComponent, TaskDialog],
})
export class TasksModule {}
