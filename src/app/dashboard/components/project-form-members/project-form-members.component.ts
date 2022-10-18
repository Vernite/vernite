import { Component, Input } from '@angular/core';
import { AddMemberDialog } from '@dashboard/dialogs/add-member/add-member.dialog';
import { DialogService } from '@main/services/dialog/dialog.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Project } from '@dashboard/interfaces/project.interface';
import { MemberService } from '@dashboard/services/member/member.service';
import { of, Observable, map } from 'rxjs';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { ProjectForm } from '@dashboard/interfaces/project-form.interface';

@Component({
  selector: 'project-form-members',
  templateUrl: './project-form-members.component.html',
})
export class ProjectFormMembersComponent implements ProjectForm {
  @Input() set project(project: Project | undefined) {
    this._project = project;
    this.existingMembers$ = project ? this.memberService.list(project.id) : of([]);
  }
  get project() {
    return this._project;
  }
  private _project: Project | undefined;

  /** @ignore */
  faPlus = faPlus;

  public members: (ProjectMember | string)[] = [];
  public newMembers: string[] = [];

  public existingMembers$: Observable<ProjectMember[]> = of([]);

  constructor(private dialogService: DialogService, private memberService: MemberService) {}

  openAddMembersDialog() {
    this.dialogService
      .open(AddMemberDialog, {})
      .afterClosed()
      .subscribe((result: string[]) => {
        this.newMembers = [...this.newMembers, ...result];
      });
  }

  save() {
    console.log(this.project);
    if (!this.project) return of(this.project!);

    return this.memberService
      .add(this.newMembers, [this.project.id])
      .pipe(map(() => this.project!));
  }
}
