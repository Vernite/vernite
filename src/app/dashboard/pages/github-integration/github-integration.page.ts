import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

/**
 * Github integration success/failure page component
 */
@Component({
  selector: 'app-github-integration-page',
  templateUrl: './github-integration.page.html',
  styleUrls: ['./github-integration.page.scss'],
})
export class GithubIntegrationPage {
  public status$ = this.activatedRoute.queryParams.pipe(
    map((params) => params['status'] as 'success' | 'error' | undefined),
  );

  constructor(private activatedRoute: ActivatedRoute) {}
}
