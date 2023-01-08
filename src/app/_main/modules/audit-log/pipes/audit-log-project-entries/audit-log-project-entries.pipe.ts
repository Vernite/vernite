import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '@tasks/interfaces/task.interface';
import { AuditLog, ChangeLog } from '../../interfaces/audit-log.interface';
import { StatusService } from '../../../../../tasks/services/status/status.service';
import { forkJoin, map, of } from 'rxjs';
import { SprintService } from '../../../../../tasks/services/sprint.service';
import { MemberService } from '../../../../../dashboard/services/member/member.service';
import { TaskService } from '../../../../../tasks/services/task/task.service';
import { TaskPropertyPipe } from '@tasks/pipes/task-property/task-property.pipe';
import { TaskPriorityPipe } from '../../../../../tasks/pipes/task-priority.pipe';
import { TaskTypePipe } from '../../../../../tasks/pipes/task-type.pipe';
import { UserService } from '../../../../../auth/services/user/user.service';
import { DateByPreferencesPipe } from '../../../../pipes/date-by-preferences/date-by-preferences.pipe';
import { Enum } from '@main/classes/enum/enum.class';
import { TaskType } from '../../../../../tasks/enums/task-type.enum';

@Pipe({
  name: 'auditLogProjectEntries',
})
export class AuditLogProjectEntriesPipe implements PipeTransform {
  private taskPropertyPipe = new TaskPropertyPipe();
  private taskPriorityPipe = new TaskPriorityPipe();
  private taskTypePipe = new TaskTypePipe();
  private DateByPreferencesPipe = new DateByPreferencesPipe(this.userService);

  constructor(
    private statusService: StatusService,
    private sprintService: SprintService,
    private memberService: MemberService,
    private taskService: TaskService,
    private userService: UserService,
  ) {}

  transform(auditLog: AuditLog<Task>) {
    if (auditLog.type === 'task') {
      const user = auditLog.user;
      const task = Object.assign(
        {},
        auditLog.sameValues,
        auditLog.oldValues,
        auditLog.newValues,
      ) as Task;
      const projectId = auditLog.projectId;

      return forkJoin({
        statuses: this.statusService.list(projectId),
        members: this.memberService.list(projectId),
        sprints: this.sprintService.list(projectId),
        newEstimatedDateString: auditLog.newValues?.estimatedDate
          ? this.DateByPreferencesPipe.transform(auditLog.newValues.estimatedDate)
          : of(null),
        oldEstimatedDateString: auditLog.oldValues?.estimatedDate
          ? this.DateByPreferencesPipe.transform(auditLog.oldValues.estimatedDate)
          : of(null),
        newDeadlineString: auditLog.newValues?.deadline
          ? this.DateByPreferencesPipe.transform(auditLog.newValues.deadline)
          : of(null),
        oldDeadlineString: auditLog.oldValues?.deadline
          ? this.DateByPreferencesPipe.transform(auditLog.oldValues.deadline)
          : of(null),
      }).pipe(
        map(
          ({
            statuses,
            members,
            sprints,
            newEstimatedDateString,
            oldEstimatedDateString,
            newDeadlineString,
            oldDeadlineString,
          }) =>
            ({
              userLabel: `${user.name} ${user.surname}`,
              taskId: task.id,
              projectId: projectId,
              taskLabel: `#${task.id} ${task.name}`,
              taskType: this.taskTypePipe.transform(task.type),
              action: (() => {
                if (!auditLog.newValues) {
                  return $localize`deleted`;
                } else if (!auditLog.oldValues) {
                  return $localize`created`;
                } else {
                  return $localize`updated`;
                }
              })(),
              actionCode: (() => {
                if (!auditLog.newValues) {
                  return 'DELETED';
                } else if (!auditLog.oldValues) {
                  return 'CREATED';
                } else {
                  return 'UPDATED';
                }
              })(),
              changes:
                auditLog.newValues &&
                auditLog.oldValues &&
                Object.entries(auditLog.newValues)
                  .map(([key, _]) => {
                    switch (key) {
                      case 'statusId':
                        return {
                          label: $localize`status`,
                          oldValue: statuses.find(
                            (status) => status.id === auditLog.oldValues?.statusId,
                          )?.name,
                          newValue: statuses.find(
                            (status) => status.id === auditLog.newValues?.statusId,
                          )?.name,
                        };
                      case 'name':
                        return {
                          label: $localize`name`,
                          oldValue: auditLog.oldValues?.name,
                          newValue: auditLog.newValues?.name,
                        };
                      case 'description':
                        return {
                          label: $localize`description`,
                          oldValue: auditLog.oldValues?.description,
                          newValue: auditLog.newValues?.description,
                        };
                      case 'priority':
                        return {
                          label: $localize`priority`,
                          oldValue: this.taskPriorityPipe.transform(auditLog.oldValues?.priority),
                          newValue: this.taskPriorityPipe.transform(auditLog.newValues?.priority),
                        };
                      case 'type':
                        return {
                          label: $localize`type`,
                          oldValue: this.taskTypePipe.transform(auditLog.oldValues?.type),
                          newValue: this.taskTypePipe.transform(auditLog.newValues?.type),
                        };
                      case 'estimatedDate':
                        return {
                          label: $localize`estimated date`,
                          oldValue: oldEstimatedDateString,
                          newValue: newEstimatedDateString,
                        };
                      case 'deadline':
                        return {
                          label: $localize`deadline`,
                          oldValue: oldDeadlineString,
                          newValue: newDeadlineString,
                        };
                      case 'assigneeId':
                        return {
                          label: $localize`assignee`,
                          oldValue: members.find(
                            (member) => member.user.id === auditLog.oldValues?.assigneeId,
                          )?.user.name,
                          newValue: members.find(
                            (member) => member.user.id === auditLog.newValues?.assigneeId,
                          )?.user.name,
                        };
                      case 'sprintId':
                        return {
                          label: $localize`sprint`,
                          oldValue: sprints.find(
                            (sprint) => sprint.id === auditLog.oldValues?.sprintId,
                          )?.name,
                          newValue: sprints.find(
                            (sprint) => sprint.id === auditLog.newValues?.sprintId,
                          )?.name,
                        };
                      case 'storyPoints':
                        return {
                          label: $localize`story points`,
                          oldValue: auditLog.oldValues?.storyPoints,
                          newValue: auditLog.newValues?.storyPoints,
                        };
                    }
                    return null;
                  })
                  .filter(Boolean)
                  .sort((a, b) => {
                    if (a?.newValue && !a?.oldValue && !b?.newValue) {
                      return 1;
                    } else if (!a?.newValue && a?.oldValue && b?.newValue) {
                      return -1;
                    } else {
                      return 0;
                    }
                  }),
            } as ChangeLog),
        ),
      );
    }

    return null;
  }

  private getLabel(userLabel: string, keyLabel: string, taskLabel: string, value: any) {
    return `User ${userLabel} changed ${keyLabel} of the ${taskLabel} to ${value}`;
  }

  private getChangeTypeFromAuditLog(auditLog: AuditLog<Task>): string {
    const taskType = (auditLog.newValues?.type ||
      auditLog.oldValues?.type ||
      auditLog.sameValues?.type)!;
    const action = (() => {
      if (!auditLog.newValues) {
        return 'deleted';
      } else if (!auditLog.oldValues) {
        return 'created';
      } else {
        return 'updated';
      }
    })();

    const taskTypeString = Enum.keyByValue(TaskType, taskType);

    return `${action} ${taskTypeString}`.toUpperCase();
  }
}
