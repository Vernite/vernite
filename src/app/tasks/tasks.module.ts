import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '../_main/_main.module';
import { BoardTaskComponent } from './components/board-task/board-task.component';
import { InputAssigneeComponent } from './components/input-assignee/input-assignee.component';
import { InputIssueComponent } from './components/input-issue/input-issue.component';
import { InputPullRequestComponent } from './components/input-pull-request/input-pull-request.component';
import { InputTaskPropertyComponent } from './components/input-task-property/input-task-property.component';
import { StatusLabelComponent } from './components/status-label/status-label.component';
import { ViewOptionsComponent } from './components/view-options/view-options.component';
import { TaskDialog } from './dialogs/task/task.dialog';
import { BoardPage } from './pages/board/board.page';
import { SchedulePage } from './pages/schedule/schedule.page';
import { TaskListPage } from './pages/task-list/task-list.page';
import { StatusColorPipe } from './pipes/status-color.pipe';
import { TaskPriorityIconPipe } from './pipes/task-priority-icon.pipe';
import { TaskPriorityPipe } from './pipes/task-priority.pipe';
import { TaskTypeIconPipe } from './pipes/task-type-icon.pipe';
import { TaskTypePipe } from './pipes/task-type.pipe';
import { TasksRoutingModule } from './tasks.routing';
import { TrackerComponent } from './components/tracker/tracker.component';
import { TimeTracksTotalPipe } from './pipes/time-tracks-total/time-tracks-total.pipe';
import { TimeTrackTimerPipe } from './pipes/time-track-timer/time-track-timer.pipe';
import { TimeTrackDurationPipe } from './pipes/time-track-duration/time-track-duration.pipe';
import { TrackerEntryComponent } from './components/tracker/tracker-entry/tracker-entry.component';
import { InputEpicComponent } from './components/input-epic/input-epic.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskRowComponent } from './components/task-row/task-row.component';
import { InputTaskParentComponent } from './components/input-task-parent/input-task-parent.component';
import { TaskPage } from './pages/task/task.page';
import { TaskPipe } from './pipes/task/task.pipe';

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
    SchedulePage,
    InputAssigneeComponent,
    StatusLabelComponent,
    StatusColorPipe,
    InputTaskPropertyComponent,
    InputIssueComponent,
    InputPullRequestComponent,
    InputTaskParentComponent,
    TrackerComponent,
    TrackerEntryComponent,
    TimeTracksTotalPipe,
    TimeTrackTimerPipe,
    TimeTrackDurationPipe,
    InputEpicComponent,
    TaskListComponent,
    TaskRowComponent,
    TaskPage,
    TaskPipe,
  ],
  exports: [TaskTypePipe],
})
export class TasksModule {}
