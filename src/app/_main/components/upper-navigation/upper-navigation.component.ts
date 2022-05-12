import { Component } from '@angular/core';
import { faAngleDown, faCog, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '@main/services/dialog.service';
import { TaskService } from '@tasks/services/task.service';

@Component({
  selector: 'app-upper-navigation',
  templateUrl: './upper-navigation.component.html',
  styleUrls: ['./upper-navigation.component.scss'],
})
export class UpperNavigationComponent {
  constructor(private dialogService: DialogService, private taskService: TaskService) {}

  faAngleDown = faAngleDown;
  faUser = faUser;
  faCog = faCog;
  faSignOut = faSignOut;

  public active: boolean = false;

  createNewTask() {
    // this.dialogService
    //   .open(TaskDialog, {
    //     variant: TaskDialogVariant.CREATE,
    //   } as TaskDialogData)
    //   .afterClosed()
    //   .subscribe((result) => {
    //     if (result) {
    //       this.taskService.create(this.projectId, result);
    //     }
    //   });
  }

  public openProfile() {
    this.active = true;
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
