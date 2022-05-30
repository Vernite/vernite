import { Injectable } from '@angular/core';
import {
  GitAccount,
  GitIntegration,
  GitIssue,
  GitPull
} from '@dashboard/interfaces/git-integration.interface';
import { Project } from '@dashboard/interfaces/project.interface';
import { Service } from '@main/decorators/service.decorator';
import { ApiService } from '@main/services/api.service';
import { filter, interval, map, mergeMap, Observable, take } from 'rxjs';
import { ProjectService } from './project.service';

/**
 * How to use Git integration service:
 *
 * 1. Run method `startGitHubIntegration()` to start the integration process and open the browser to the GitHub login page.
 *
 *
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class GitIntegrationService {
  constructor(private apiService: ApiService, private projectService: ProjectService) {}

  /**
   * Start GitHub integration process - opens the GitHub page in new window, to give user ability to choose witch account and repositories wants to give access to.
   * @example this.gitHubIntegrationService.startGitHubIntegration()
   * @returns Observable<boolean> true if the opened window with GitHub integration was closed
   */
  public startGitHubIntegration(): Observable<boolean> {
    return this.apiService.get('/user/integration/github/repository').pipe(
      map((response: any) => response.link),
      mergeMap((url) => {
        const win = window.open(url, '_blank');

        if (!win) throw new Error('This browser does not support window.open');

        return interval(100).pipe(
          map(() => win.closed),
          filter((closed) => closed),
          take(1),
        );
      }),
    );
  }

  public postGitHubIntegration(installationId: string): Observable<void> {
    return this.apiService.post(`/user/integration/github`, {
      params: { installationId },
    });
  }

  public getGitHubIntegration(): Observable<GitIntegration> {
    return this.apiService.get('/user/integration/github/repository');
  }

  public attachGitHubIntegration(projectId: number, repositoryName: string): Observable<void> {
    return this.apiService.post(`/project/${projectId}/integration/github`, {
      body: repositoryName,
    });
  }

  public getConnectedGitHubAccounts(): Observable<GitAccount[]> {
    return this.apiService
      .get('/user/integration/github')
      .pipe(
        map((accounts: GitAccount[]) =>
          accounts.map((account) => ({ ...account, gitHubUsername: `@${account.gitHubUsername}` })),
        ),
      );
  }

  /**
   * Delete the given account connection
   * @param gitHubAccountId GitHub account id
   * @returns object with link to open the GitHub page with application removal
   */
  public deleteConnectedGitHubAccount(gitHubAccountId: number): Observable<{ link: string }> {
    return this.apiService.delete(`/user/integration/github/${gitHubAccountId}`);
  }

  public deleteGitHubIntegration(projectId: number): Observable<void> {
    return this.apiService.delete(`/project/${projectId}/integration/github`);
  }

  public hasGitHubIntegration(projectId: number): Observable<boolean> {
    return this.projectService.get(projectId).pipe(map((project) => !!project.gitHubIntegration));
  }

  public gitHubIssueList(projectId: number) {
    return this.apiService.get(`/project/${projectId}/integration/git/issue`);
  }

  public connectGitHubIssue(projectId: number, taskId: number, issue?: GitIssue) {
    return this.apiService.post(`/project/${projectId}/task/${taskId}/integration/git/issue`, {
      body: issue,
    });
  }

  public disconnectGitHubIssue(projectId: number, taskId: number) {
    return this.apiService.delete(`/project/${projectId}/task/${taskId}/integration/git/issue`);
  }

  public gitHubPullList(projectId: number) {
    return this.apiService.get(`/project/${projectId}/integration/git/pull`);
  }

  public connectGitHubPull(projectId: number, taskId: number, pull?: GitPull) {
    return this.apiService.post(`/project/${projectId}/task/${taskId}/integration/git/pull`, {
      body: pull,
    });
  }

  public disconnectGitHubPull(projectId: number, taskId: number) {
    return this.apiService.delete(`/project/${projectId}/task/${taskId}/integration/git/pull`);
  }

  /**
   * Checks if the given account is the owner of the repository
   * @param repositoryName Repository name with it's owner ex. @czemar/cli
   * @param account GitHub account object to test with
   * @example this.gitHubIntegrationService.isOwnerOfRepository('@czemar/cli', account)
   * @returns true if the repository is owned by the account
   */
  public isOwnerOfRepository(repositoryName: string, account: GitAccount): boolean {
    const preparedUsername = account.gitHubUsername.replace('@', '');
    return Boolean(repositoryName.match(new RegExp('^' + preparedUsername + '/*')));
  }

  public getGitHubAccountConnectedProjects(account: GitAccount): Observable<Project[]> {
    return this.projectService
      .list()
      .pipe(
        map((projects) =>
          projects.filter(
            (project: Project) =>
              project.gitHubIntegration &&
              this.isOwnerOfRepository(project.gitHubIntegration, account),
          ),
        ),
      );
  }
}
