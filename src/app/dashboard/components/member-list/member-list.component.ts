import { Component, Input } from '@angular/core';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { MemberService } from '@dashboard/services/member/member.service';
import { isString } from 'lodash-es';

@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent {
  @Input() projectId?: number;
  @Input() members: (ProjectMember | string)[] = [];

  public get oldMembers(): ProjectMember[] {
    return this.members.filter((m) => !isString(m)) as ProjectMember[];
  }

  public get newMembers(): string[] {
    return this.members.filter((m) => isString(m)) as string[];
  }

  constructor(private memberService: MemberService) {}

  deleteMember(id: number[]) {
    if (!this.projectId) return;

    this.memberService.remove(this.projectId, id).subscribe(() => {
      location.reload();
    });
  }
}
