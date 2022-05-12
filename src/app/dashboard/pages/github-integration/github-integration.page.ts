import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitIntegrationService } from '@dashboard/services/git-integration.service';

@Component({
  selector: 'app-github-integration-page',
  templateUrl: './github-integration.page.html',
  styleUrls: ['./github-integration.page.scss'],
})
export class GithubIntegrationPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private gitIntegrationService: GitIntegrationService,
  ) {}

  ngOnInit() {
    const { installation_id, setup_action } = this.activatedRoute.snapshot.queryParams;

    if (setup_action !== 'update') {
      this.gitIntegrationService.postGitHubIntegration(installation_id).subscribe();
    }
  }
}
