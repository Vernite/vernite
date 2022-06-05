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
  public members$!: Observable<Map<number, ProjectMember>>;

  @Input()
  memberList!: ProjectMember[];

  constructor(private memberService: MemberService, private activatedRoute: ActivatedRoute) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;
    this.projectId = projectId;
  }

  deleteMember(id: number[]) {
    this.memberService.remove(this.projectId, id).subscribe(() => {
      location.reload();
    });
  }

  ngOnInit() {}
}
