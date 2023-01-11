import { Component, Input, OnInit } from '@angular/core';
import { AddMemberDialog } from '@dashboard/dialogs/add-member/add-member.dialog';
import { DialogService } from '@main/services/dialog/dialog.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Project } from '@dashboard/interfaces/project.interface';
import { MemberService } from '@dashboard/services/member/member.service';
import { of, Observable, map, switchMap } from 'rxjs';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import { ProjectForm } from '@dashboard/interfaces/project-form.interface';
import { isString } from 'lodash-es';

/**
 * Project members form component
 */
@Component({
  selector: 'project-form-members',
  templateUrl: './project-form-members.component.html',
})
export class ProjectFormMembersComponent implements OnInit, ProjectForm {
  /** Project to edit */
  @Input() set project(project: Project | undefined) {
    this._project = project;
    this.existingMembers$ = project ? this.memberService.list(project.id) : of([]);
  }
  get project() {
    return this._project;
  }
  /** Project to edit */
  private _project: Project | undefined;

  /** @ignore */
  faPlus = faPlus;

  /** Members to add to project */
  public members: (ProjectMember | string)[] = [];

  /** Members to add to project */
  public newMembers: string[] = [];

  /** Members to remove from project */
  public membersToRemove: number[] = [];

  /** Members already existing in the project */
  public existingMembers$: Observable<ProjectMember[]> = of([]);

  constructor(private dialogService: DialogService, private memberService: MemberService) {}

  ngOnInit() {
    this.existingMembers$.subscribe((members) => {
      this.members = members;
    });
  }

  /**
   * Open dialog to add new members
   */
  openAddMembersDialog() {
    this.dialogService
      .open(AddMemberDialog, {})
      .afterClosed()
      .subscribe((result: string[]) => {
        this.newMembers = [...this.newMembers, ...result];
      });
  }

  /**
   * Remove member from project
   * @param idOrName Member id or name
   */
  removeMember(idOrName: number | string) {
    if (isString(idOrName)) {
      this.newMembers = this.newMembers.filter((m) => m !== idOrName);
    } else {
      this.members = this.members.filter((m) => idOrName !== (isString(m) ? m : m.user.id));
      this.membersToRemove.push(idOrName);
    }
  }

  /**
   * Save all new members to project and remove members to detach from project
   * @returns Project observable
   */
  save() {
    // Do nothing when project not exists
    if (!this.project) return of(this.project!);

    return of(null).pipe(
      // Remove members
      switchMap((project) => {
        if (this.membersToRemove.length) {
          return this.memberService
            .remove(this.project!.id, this.membersToRemove)
            .pipe(map(() => project));
        } else {
          return of(project);
        }
      }),

      // Add new members
      switchMap(() => {
        if (this.newMembers.length) {
          return this.memberService
            .add(this.newMembers, [this.project!.id])
            .pipe(map(() => this.project!));
        } else {
          return of(this.project!);
        }
      }),
    );
  }

  validate() {
    return of(true);
  }
}
