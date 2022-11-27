import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { isString } from 'lodash-es';

@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent {
  @Input() projectId?: number;
  @Input() members: (ProjectMember | string)[] = [];

  @Output() remove = new EventEmitter<number | string>();

  public get oldMembers(): ProjectMember[] {
    return this.members.filter((m) => !isString(m)) as ProjectMember[];
  }

  public get newMembers(): string[] {
    return this.members.filter((m) => isString(m)) as string[];
  }

  constructor() {}

  deleteMember(idOrName: number | string) {
    this.remove.emit(idOrName);
  }
}
