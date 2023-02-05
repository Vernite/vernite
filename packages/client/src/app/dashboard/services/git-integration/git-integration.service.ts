import { Injectable, Injector } from '@angular/core';
import { GitAccount, GitIntegration } from '@dashboard/interfaces/git-integration.interface';
import { Project } from '@dashboard/interfaces/project.interface';
import { Service } from '@main/decorators/service/service.decorator';
import { ApiService } from '@main/services/api/api.service';
import { filter, interval, map, mergeMap, Observable, take } from 'rxjs';
import { ProjectService } from '../project/project.service';
import { Errors } from '@main/interfaces/http-error.interface';
import { BaseService } from '@main/services/base/base.service';
import { Cache } from '@main/decorators/cache/cache.decorator';

/**
 * How to use Git integration service:
 *
 * 1. Run method `startGitHubIntegration()` to start the integration process and open the browser to the GitHub
 * login page.
 *
 * 2. Run method `postGitHubIntegration(installationId: string)` after receiving `installationId` to finalize
 * integration process.
 *
 * @TODO change docs after last GitHub rework
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class GitIntegrationService extends BaseService<
  Errors<
    | 'PROJECT_ALREADY_HAS_INTEGRATION'
    | 'PROJECT_OR_INSTALLATION_NOT_FOUND'
    | 'INSTALLATION_WITH_GIVEN_ID_NOT_FOUND'
    | 'PROJECT_OR_INTEGRATION_NOT_FOUND'
  >
> {
  constructor(
    private injector: Injector,
    private apiService: ApiService,
    private projectService: ProjectService,
  ) {
    super(injector);
  }

  protected errorCodes = {
    PROJECT_ALREADY_HAS_INTEGRATION: {
      message: $localize`Project already has integration`,
    },
    PROJECT_OR_INSTALLATION_NOT_FOUND: {
      message: $localize`Project or git installation not found`,
    },
    INSTALLATION_WITH_GIVEN_ID_NOT_FOUND: {
      message: $localize`Installation with given id not found`,
    },
    PROJECT_OR_INTEGRATION_NOT_FOUND: {
      message: $localize`Project or integration not found`,
    },
  };

  /**
   * Start GitHub integration process - opens the GitHub page in new window, to give user ability to choose
   * what account and repositories wants to give access to.
   * @example this.gitHubIntegrationService.startGitHubIntegration()
   * @returns Observable<boolean> true if the opened window with GitHub integration was closed
   */
  public startGitHubIntegration(): Observable<boolean> {
    return this.apiService.get('/user/integration/git/github/repository').pipe(
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

  /**
   * After GitHub authentication, GitHub page redirects to our system with installationId, so It is needed to send the installationId to backend by ourselves.
   * @param installationId Installation id returned by GitHub in redirect link
   */
  public postGitHubIntegration(installationId: string): Observable<void> {
    return this.apiService.post(`/user/integration/git/github`, {
      params: { installationId },
    });
  }

  public connectGitHubAccount() {
    const win = window.open('/api/user/integration/git/github/authorize', '_blank');

    if (!win) throw new Error('This browser does not support window.open');

    return interval(100).pipe(
      map(() => win.closed),
      filter((closed) => closed),
      take(1),
    );
  }

  /**
   * Get GitHub integration object with repositories list
   */
  @Cache()
  public getGitHubIntegration(): Observable<GitIntegration> {
    return this.apiService.get('/user/integration/git/github/repository');
  }

  /**
   * Attach GitHub repository to specific project
   * @param projectId Project id to attach GitHub account
   * @param repositoryName Repository name to connect with
   */
  public attachGitHubIntegration(
    projectId: number,
    repositoryName: string,
  ): Observable<{ id: number; name: string; gitHubIntegration: string }> {
    return this.apiService
      .post(`/project/${projectId}/integration/git/github`, {
        body: { fullName: repositoryName }, // TODO: send whole repository object
      })
      .pipe(
        this.validate({
          400: 'PROJECT_ALREADY_HAS_INTEGRATION',
          404: 'PROJECT_OR_INSTALLATION_NOT_FOUND',
        }),
      );
  }

  /**
   * Get list of connected GitHub accounts
   * @returns List of connected GitHub accounts
   */
  @Cache()
  public getConnectedGitHubAccounts(): Observable<GitAccount[]> {
    return this.apiService
      .get('/user/integration/git/github')
      .pipe(
        map((accounts: GitAccount[]) =>
          accounts.map((account) => ({ ...account, gitHubUsername: `@${account.login}` })),
        ),
      );
  }

  /**
   * Delete the given account connection
   * @param gitHubAccountId GitHub account id
   * @returns object with link to open the GitHub page with application removal
   */
  public deleteConnectedGitHubAccount(gitHubAccountId: number): Observable<void> {
    return this.apiService.delete(`/user/integration/git/github/${gitHubAccountId}`).pipe(
      this.validate({
        404: 'INSTALLATION_WITH_GIVEN_ID_NOT_FOUND',
      }),
    );
  }

  /**
   * Detach GitHub integration from project
   * @param projectId Project id to remove integration from
   */
  public deleteGitHubIntegration(projectId: number): Observable<void> {
    return this.apiService.delete(`/project/${projectId}/integration/git/github`).pipe(
      this.validate({
        404: 'PROJECT_OR_INTEGRATION_NOT_FOUND',
      }),
    );
  }

  /**
   * Check if project has GitHub integration (you can also check this with Project object by checking for
   * `gitHubIntegration` property)
   * @param projectId Id of the project to check
   */
  public hasGitHubIntegration(projectId: number): Observable<boolean> {
    return this.projectService.get(projectId).pipe(map((project) => !!project.gitHubIntegration));
  }

  /**
   * Get list of issues from GitHub
   * @param projectId Id of the project to get all issues available to connect to
   * @returns list of GitHub issues
   */
  public gitHubIssueList(projectId: number) {
    return this.apiService.get(`/project/${projectId}/integration/git/issue`).pipe(
      this.validate({
        404: 'PROJECT_OR_INTEGRATION_NOT_FOUND',
      }),
    );
  }

  /**
   * Get list of pull requests from GitHub
   * @param projectId Id of the project to get all pull requests available to connect to
   * @returns list of GitHub pull requests
   */
  public gitHubPullList(projectId: number) {
    return this.apiService.get(`/project/${projectId}/integration/git/pull`).pipe(
      this.validate({
        404: 'PROJECT_OR_INTEGRATION_NOT_FOUND',
      }),
    );
  }

  /**
   * Checks if the given account is the owner of the repository
   * @param repositoryName Repository name with it's owner ex. @czemar/cli
   * @param account GitHub account object to test with
   * @example this.gitHubIntegrationService.isOwnerOfRepository('@czemar/cli', account)
   * @returns true if the repository is owned by the account
   */
  public isOwnerOfRepository(repositoryName: string, account: GitAccount): boolean {
    const preparedUsername = account.login.replace('@', '');
    return Boolean(repositoryName.match(new RegExp('^' + preparedUsername + '/*')));
  }

  /**
   * Returns list of projects connected to current user repositories
   * @param account Current user GitAccount
   * @returns list of projects connected to current user repositories
   */
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
