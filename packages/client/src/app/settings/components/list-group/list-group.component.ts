import { Component, Input } from '@angular/core';

/**
 * List group component to add label over the group with horizontal line
 */
@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
})
export class ListGroupComponent {
  /**
   * Label to display
   * @required
   */
  @Input() label!: string;

  constructor() {}
}
