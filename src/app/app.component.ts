import { Component } from '@angular/core';

/**
 * Main Component which contains redirects to submodules
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workflow';
  current_language = $localize`english`;
}
