import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutes } from './tasks.routing';
import { BoardPage } from './pages/board/board.page';

@NgModule({
  imports: [CommonModule, TasksRoutes],
  declarations: [BoardPage],
})
export class TasksModule {}
