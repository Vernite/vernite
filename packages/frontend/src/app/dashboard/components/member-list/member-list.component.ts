import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { isString } from 'lodash-es';

/**
 * Member list component
 */
@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent {
  /** Project ID */
  @Input() projectId?: number;

  /** Members list */
  @Input() members: (ProjectMember | string)[] = [];

  /** List of members to remove */
  @Output() remove = new EventEmitter<number | string>();

  /** List of current members */
  public get oldMembers(): ProjectMember[] {
    return this.members.filter((m) => !isString(m)) as ProjectMember[];
  }

  /** List of new members */
  public get newMembers(): string[] {
    return this.members.filter((m) => isString(m)) as string[];
  }

  constructor() {}

  /**
   * Delete member
   * @param idOrName Member ID or name
   */
  deleteMember(idOrName: number | string) {
    this.remove.emit(idOrName);
  }
}
