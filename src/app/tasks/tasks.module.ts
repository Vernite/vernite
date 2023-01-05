import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainModule } from '../_main/_main.module';
import { BoardTaskComponent } from './components/board-task/board-task.component';
import { AssigneeComponent } from './components/assignee/assignee.component';
import { InputIssueComponent } from './components/input-issue/input-issue.component';
import { InputPullRequestComponent } from './components/input-pull-request/input-pull-request.component';
import { InputTaskPropertyComponent } from './components/input-task-property/input-task-property.component';
import { StatusLabelComponent } from './components/status-label/status-label.component';
import { TaskDialog } from './dialogs/task/task.dialog';
import { SprintDialog } from './dialogs/sprint/sprint.dialog';
import { SchedulePage } from './pages/schedule/schedule.page';
import { StatusColorPipe } from './pipes/status-color.pipe';
import { TaskPriorityIconPipe } from './pipes/task-priority-icon.pipe';
import { TaskPriorityPipe } from './pipes/task-priority.pipe';
import { TaskTypePipe } from './pipes/task-type.pipe';
import { TasksRoutingModule } from './tasks.routing';
import { TrackerComponent } from './components/tracker/tracker.component';
import { TimeTracksTotalPipe } from './pipes/time-tracks-total/time-tracks-total.pipe';
import { TimeTrackTimerPipe } from './pipes/time-track-timer/time-track-timer.pipe';
import { TimeTrackDurationPipe } from './pipes/time-track-duration/time-track-duration.pipe';
import { TaskViewOptionsComponent } from './components/task-view-options/task-view-options.component';
import { TrackerEntryComponent } from './components/tracker/tracker-entry/tracker-entry.component';
import { InputEpicComponent } from './components/input-epic/input-epic.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskRowComponent } from './components/task-row/task-row.component';
import { InputTaskParentComponent } from './components/input-task-parent/input-task-parent.component';
import { TaskPage } from './pages/task/task.page';
import { SprintPage } from './pages/sprint/sprint.page';
import { BacklogPage } from './pages/backlog/backlog.page';
import { TaskPipe } from './pipes/task/task.pipe';
import { BoardComponent } from './components/tasks-board/tasks-board.component';
import { InputAssigneeComponent } from './components/input-assignee/input-assignee.component';
import { MemberColorPipe } from './pipes/member-color/member-color.pipe';
import { MessagesModule } from '../messages/messages.module';
import { TaskCommentsComponent } from './components/task-comments/task-comments.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MainModule, TasksRoutingModule, MessagesModule],
  declarations: [
    BoardTaskComponent,
    TaskDialog,
    TaskTypePipe,
    TaskPriorityPipe,
    TaskPriorityIconPipe,
    SchedulePage,
    AssigneeComponent,
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
    TaskViewOptionsComponent,
    BoardComponent,
    SprintDialog,
    InputEpicComponent,
    TaskListComponent,
    TaskRowComponent,
    TaskPage,
    SprintPage,
    BacklogPage,
    TaskPipe,
    InputAssigneeComponent,
    MemberColorPipe,
    TaskCommentsComponent,
  ],
  exports: [TaskTypePipe, InputAssigneeComponent, TaskListComponent],
})
export class TasksModule {}
