import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks.routing';
import { BoardPage } from './pages/board/board.page';
import { BoardTaskComponent } from './components/board-task/board-task.component';
import { MainModule } from '../_main/_main.module';
import { TaskDialog } from './dialogs/task/task.dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskTypePipe } from './pipes/task-type.pipe';
import { TaskPriorityPipe } from './pipes/task-priority.pipe';
import { TaskPriorityIconPipe } from './pipes/task-priority-icon.pipe';
import { TaskTypeIconPipe } from './pipes/task-type-icon.pipe';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MainModule, TasksRoutingModule],
  declarations: [
    BoardPage,
    BoardTaskComponent,
    TaskDialog,
    TaskTypePipe,
    TaskPriorityPipe,
    TaskPriorityIconPipe,
    TaskTypeIconPipe,
  ],
})
export class TasksModule {}
