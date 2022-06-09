import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { MemberService } from '@dashboard/services/member.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  public projectId!: number;

  public memberList$!: Observable<ProjectMember[]>;

  @Input()
  addedMembers?: string[];

  @Input()
  type: 'create' | 'edit' = 'edit';

  @Input()
  memberList!: ProjectMember[];

  constructor(private memberService: MemberService, private activatedRoute: ActivatedRoute) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;
    this.projectId = projectId;

    this.memberList$ = this.memberService.list(projectId);
  }

  deleteMember(id: number[]) {
    this.memberService.remove(this.projectId, id).subscribe(() => {
      location.reload();
    });
  }

  ngOnInit() {}
}
