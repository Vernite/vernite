import { Component, ElementRef, ViewChild } from '@angular/core';
import { faAngleDown, faCog, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '@main/services/dialog.service';
import { TaskDialog, TaskDialogData, TaskDialogVariant } from '@tasks/dialogs/task/task.dialog';
import { TaskService } from '@tasks/services/task.service';
import { fromEvent, skip, take } from 'rxjs';

@Component({
  selector: 'app-upper-navigation',
  templateUrl: './upper-navigation.component.html',
  styleUrls: ['./upper-navigation.component.scss'],
})
export class UpperNavigationComponent {
  constructor(private dialogService: DialogService, private taskService: TaskService) {}

  @ViewChild('openBelow') openBelow!: ElementRef<HTMLElement>;

  faAngleDown = faAngleDown;
  faUser = faUser;
  faCog = faCog;
  faSignOut = faSignOut;

  public active: boolean = false;

  createNewTask() {
    this.dialogService
      .open(TaskDialog, {
        variant: TaskDialogVariant.CREATE,
      } as TaskDialogData)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.taskService.create(result.projectId, result);
        }
      });
  }

  public openProfile() {
    this.active = true;
    fromEvent(document, 'click')
      .pipe(skip(1), take(1))
      .subscribe(() => {
        this.closeProfile();
      });
  }

  public closeProfile() {
    this.active = false;
  }
  public toggleProfile() {
    if (!this.active) {
      this.openProfile();
    } else {
      this.closeProfile();
    }
  }
}
