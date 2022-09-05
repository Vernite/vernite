import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { GitRepository } from '@dashboard/interfaces/git-integration.interface';
import { GitIntegrationService } from '@dashboard/services/git-integration.service';
import { requiredValidator } from '@main/validators/required.validator';

@Component({
  selector: 'app-integration-github',
  templateUrl: './integration-github.component.html',
  styleUrls: ['./integration-github.component.scss'],
})
export class IntegrationGithubComponent implements OnInit {
  @Input()
  projectId!: number;

  repositoryList: GitRepository[] = [];
  public repositoryListLoaded = false;

  constructor(private gitIntegrationService: GitIntegrationService) {}

  public form = new FormGroup({
    repository: new FormControl(null, [requiredValidator()]),
  });

  connectToGithub() {
    this.gitIntegrationService.startGitHubIntegration().subscribe(() => {
      this.loadRepositories();
    });
  }

  loadRepositories() {
    this.repositoryListLoaded = false;
    this.gitIntegrationService.getGitHubIntegration().subscribe((integration) => {
      this.repositoryList = integration.gitRepositories;
      this.repositoryListLoaded = true;
    });
  }

  addRepository() {
    if (!this.form.value.repository) return;

    this.gitIntegrationService
      .attachGitHubIntegration(this.projectId, this.form.value.repository)
      .subscribe();
  }

  ngOnInit() {
    this.loadRepositories();
  }
}
