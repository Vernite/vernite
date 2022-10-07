import { Component, OnInit } from '@angular/core';
import { GitAccount } from '@dashboard/interfaces/git-integration.interface';
import { GitIntegrationService } from '@dashboard/services/git-integration/git-integration.service';
import { map, Observable, take } from 'rxjs';

interface GitAccountWithUsage {
  account: GitAccount;
  usage: Observable<string>;
}

@Component({
  selector: 'app-settings-integrations',
  templateUrl: './settings-integrations.page.html',
  styleUrls: ['./settings-integrations.page.scss'],
})
export class SettingsIntegrationsPage implements OnInit {
  public gitHubAccounts$!: Observable<GitAccountWithUsage[]>;

  constructor(private gitIntegrationService: GitIntegrationService) {}

  ngOnInit() {
    this.loadGitHubIntegration();
  }

  public loadGitHubIntegration(): void {
    this.gitHubAccounts$ = this.gitIntegrationService.getConnectedGitHubAccounts().pipe(
      map((accounts) => {
        return accounts.map((account) => {
          return {
            account,
            usage: this.getConnectedProjects(account).pipe(take(1)),
          };
        });
      }),
    );
  }

  public disconnect(account: GitAccount): void {
    this.gitIntegrationService.deleteConnectedGitHubAccount(account.id).subscribe(({ link }) => {
      window.open(link, '_blank');
    });
  }

  public getConnectedProjects(account: GitAccount): Observable<string> {
    return this.gitIntegrationService
      .getGitHubAccountConnectedProjects(account)
      .pipe(map((projects) => projects.map((project: any) => project.name).join(', ')));
  }
}
