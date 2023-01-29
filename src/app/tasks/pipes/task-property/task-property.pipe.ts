import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '@tasks/interfaces/task.interface';

@Pipe({
  name: 'taskProperty',
})
export class TaskPropertyPipe implements PipeTransform {
  localizations: { [key in keyof Task]: string } = {
    id: $localize`id`,
    name: $localize`name`,
    description: $localize`description`,
    statusId: $localize`status`,
    assigneeId: $localize`assignee`,
    sprintId: $localize`sprint`,
    projectId: $localize`project`,
    createdAt: $localize`created at`,
    updatedAt: $localize`updated at`,
    deadline: $localize`deadline`,
    estimatedDate: $localize`estimated date`,
    priority: $localize`priority`,
    type: $localize`type`,
    epic: $localize`epic`,
    workspaceId: $localize`workspace`,
    timeTracks: $localize`time tracks`,
    storyPoints: $localize`story points`,
  };

  transform(value: string): any {
    return this.localizations[value];
  }
}
