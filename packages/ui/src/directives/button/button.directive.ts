import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'button[ui-button]',
  standalone: true,
})
export class UIButtonDirective {
  @HostBinding('class.test') test: boolean = true;
}
