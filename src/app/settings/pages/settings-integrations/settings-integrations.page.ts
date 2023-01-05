import { Component, OnInit } from '@angular/core';
import { GitAccount } from '@dashboard/interfaces/git-integration.interface';
import { GitIntegrationService } from '@dashboard/services/git-integration/git-integration.service';
import { map, Observable, take } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SlackIntegrationService } from '@messages/services/slack-integration.service';
import { SlackIntegration } from '@messages/interfaces/slack.interface';

/**
 * Interface to represent GitHub account with usage in projects
 * @TODO Move this interface to other file
 */
interface GitAccountWithUsage {
  /** GitHub account */
  account: GitAccount;

  /**
   * Name of the project, where the account is used
   * @TODO Check why it is not typed with Observable<string[]> or just string[]
   */
  usage: Observable<string>;
}

/**
 * Settings integrations page component
 */
@UntilDestroy()
@Component({
  selector: 'app-settings-integrations',
  templateUrl: './settings-integrations.page.html',
  styleUrls: ['./settings-integrations.page.scss'],
})
export class SettingsIntegrationsPage implements OnInit {
  /** GitHub accounts */
  public gitHubAccounts$!: Observable<GitAccountWithUsage[]>;

  /** Slack accounts */
  public slackAccounts$!: Observable<SlackIntegration[]>;

  /** @ignore */
  faPlus = faPlus;

  constructor(
    private gitIntegrationService: GitIntegrationService,
    private slackService: SlackIntegrationService,
  ) {}

  ngOnInit() {
    this.loadGitHubIntegration();
    this.loadSlackIntegrations();
  }

  /** Open GitHub integration window */
  public openGitHubIntegration() {
    const win = window.open('/api/user/integration/git/github/authorize', '_blank');

    if (!win) throw new Error('This browser does not support window.open');
  }

  /** Load GitHub accounts */
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

  /** Disconnect GitHub account */
  public disconnectGithubAccount(account: GitAccount): void {
    this.gitIntegrationService.deleteConnectedGitHubAccount(account.id).subscribe(({ link }) => {
      window.open(link, '_blank');
    });
  }

  /** Get connected projects */
  public getConnectedProjects(account: GitAccount): Observable<string> {
    return this.gitIntegrationService
      .getGitHubAccountConnectedProjects(account)
      .pipe(map((projects) => projects.map((project: any) => project.name).join(', ')));
  }

  /** Open Slack integration window */
  public openSlackIntegration() {
    this.slackService.slackInstall().pipe(untilDestroyed(this)).subscribe();
  }

  /** Load Slack accounts */
  public loadSlackIntegrations() {
    this.slackAccounts$ = this.slackService.getSlackIntegrations();
  }

  /** Disconnect Slack account */
  public disconnectSlackAccount(account: SlackIntegration) {
    this.slackService.deleteWithConfirmation(account.id).subscribe(() => {
      location.reload();
    });
  }
}
