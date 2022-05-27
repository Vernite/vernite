import { Component } from '@angular/core';
import { GitAccount } from '@dashboard/interfaces/git-integration.interface';
import { GitIntegrationService } from '@dashboard/services/git-integration.service';
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
export class SettingsIntegrationsPage {
  public gitHubAccounts$: Observable<GitAccountWithUsage[]>;

  constructor(private gitIntegrationService: GitIntegrationService) {
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

    this.gitHubAccounts$.subscribe((res) => {
      console.log(res);
    });
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
