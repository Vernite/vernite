import { Component, OnInit } from '@angular/core';
import { ApiService } from './_common/services/api.service';

/**
 * Main Component which contains redirects to submodules
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'workflow';
  current_language = $localize`english`;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getHelloWorld('world');
  }
}
