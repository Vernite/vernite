import { Pipe, PipeTransform } from '@angular/core';
import { UserUtils } from '@dashboard/classes/user.class';
import { ProjectMember } from '@dashboard/interfaces/project-member.interface';
import Color from 'color';

@Pipe({
  name: 'memberColor',
})
export class MemberColorPipe implements PipeTransform {
  public transform(member: ProjectMember | number | null): Color | null {
    if (!member) return null;
    if (typeof member === 'number') {
      return UserUtils.getColorById(member);
    } else {
      return UserUtils.getColorById(member.user.id);
    }
  }
}
