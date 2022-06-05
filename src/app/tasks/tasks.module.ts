import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '../_main/_main.module';
import { BoardTaskComponent } from './components/board-task/board-task.component';
import { InputAssigneeComponent } from './components/input-assignee/input-assignee.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { ViewOptionsComponent } from './components/view-options/view-options.component';
import { TaskDialog } from './dialogs/task/task.dialog';
import { BoardPage } from './pages/board/board.page';
import { SchedulePage } from './pages/schedule/schedule.page';
import { TaskListPage } from './pages/task-list/task-list.page';
import { TaskPriorityIconPipe } from './pipes/task-priority-icon.pipe';
import { TaskPriorityPipe } from './pipes/task-priority.pipe';
import { TaskTypeIconPipe } from './pipes/task-type-icon.pipe';
import { TaskTypePipe } from './pipes/task-type.pipe';
import { TasksRoutingModule } from './tasks.routing';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MainModule, TasksRoutingModule],
  declarations: [
    BoardPage,
    BoardTaskComponent,
    TaskListPage,
    TaskDialog,
    TaskTypePipe,
    TaskPriorityPipe,
    TaskPriorityIconPipe,
    TaskTypeIconPipe,
    ViewOptionsComponent,
    TasksTableComponent,
    SchedulePage,
    InputAssigneeComponent,
  ],
})
export class TasksModule {}
