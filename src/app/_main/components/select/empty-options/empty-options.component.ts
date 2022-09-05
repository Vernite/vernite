import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-empty-options',
  templateUrl: './empty-options.component.html',
  styleUrls: ['./empty-options.component.scss'],
})
export class EmptyOptionsComponent {
  @HostBinding('style.display') display: 'inline' | 'none' = 'inline';

  public hide() {
    this.display = 'none';
  }

  public show() {
    this.display = 'inline';
  }
}
