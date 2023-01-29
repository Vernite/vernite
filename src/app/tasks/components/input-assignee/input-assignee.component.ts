import { Input, Component, ChangeDetectorRef, Optional } from '@angular/core';
import { ControlAccessor } from '@main/classes/control-accessor/control-accessor.class';
import { ProjectMember } from '../../../dashboard/interfaces/project-member.interface';
import { NgControl } from '@angular/forms';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

/** Component to select assignee for the task. Used for example in task edit dialog and filters. */
@Component({
  selector: 'input-assignee',
  templateUrl: './input-assignee.component.html',
  styleUrls: ['./input-assignee.component.scss'],
})
export class InputAssigneeComponent extends ControlAccessor {
  /** Members of the project */
  @Input() members!: ProjectMember[];

  @Input() showUnassignedOption = true;
  @Input() showAllOption = false;

  /** @ignore */
  faUser = faUser;

  /** @ignore */
  faUsers = faUsers;

  constructor(
    @Optional() public override ngControl: NgControl,
    protected override cdRef: ChangeDetectorRef,
  ) {
    super(ngControl, cdRef);

    // this.memberById = memoize(this.memberById.bind(this));
  }

  /** Searches for member in members list by id */
  public memberById(id: number): ProjectMember | undefined {
    return this.members.find((member) => member.user.id === id);
  }
}
