import { Component, OnInit } from '@angular/core';
import { GitAccount } from '@dashboard/interfaces/git-integration.interface';
import { GitIntegrationService } from '@dashboard/services/git-integration/git-integration.service';
import { map, Observable, take } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SlackIntegration } from '../../../messages/interfaces/slack-integration.interface';
import { SlackService } from '@messages/services/slack/slack.service';

interface GitAccountWithUsage {
  account: GitAccount;
  usage: Observable<string>;
}

@UntilDestroy()
@Component({
  selector: 'app-settings-integrations',
  templateUrl: './settings-integrations.page.html',
  styleUrls: ['./settings-integrations.page.scss'],
})
export class SettingsIntegrationsPage implements OnInit {
  public gitHubAccounts$!: Observable<GitAccountWithUsage[]>;
  public slackAccounts$!: Observable<SlackIntegration[]>;

  /** @ignore */
  faPlus = faPlus;

  constructor(
    private gitIntegrationService: GitIntegrationService,
    private slackService: SlackService,
  ) {}

  ngOnInit() {
    this.loadGitHubIntegration();
    this.loadSlackIntegrations();
  }

  public openGitHubIntegration() {
    this.gitIntegrationService.startGitHubIntegration().pipe(untilDestroyed(this)).subscribe();
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

  public disconnectGithubAccount(account: GitAccount): void {
    this.gitIntegrationService.deleteConnectedGitHubAccount(account.id).subscribe(({ link }) => {
      window.open(link, '_blank');
    });
  }

  public getConnectedProjects(account: GitAccount): Observable<string> {
    return this.gitIntegrationService
      .getGitHubAccountConnectedProjects(account)
      .pipe(map((projects) => projects.map((project: any) => project.name).join(', ')));
  }

  public openSlackIntegration() {
    this.slackService.openIntegrationPage().pipe(untilDestroyed(this)).subscribe();
  }

  public loadSlackIntegrations() {
    this.slackAccounts$ = this.slackService.getSlackIntegrations();
  }

  disconnectSlackAccount(account: SlackIntegration) {
    this.slackService.deleteIntegration(account.id).subscribe(() => {
      location.reload();
    });
  }
}
