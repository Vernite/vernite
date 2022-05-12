import { Injectable } from '@angular/core';
import { GitIntegration } from '@dashboard/interfaces/git-integration.interface';
import { Service } from '@main/decorators/service.decorator';
import { ApiService } from '@main/services/api.service';
import { filter, interval, map, mergeMap, Observable, of, take, tap } from 'rxjs';

@Service()
@Injectable({
  providedIn: 'root',
})
export class GitIntegrationService {
  constructor(private apiService: ApiService) {}

  public startGitHubIntegration(): Observable<boolean> {
    return this.apiService.get('/integration/github').pipe(
      map((response: any) => response.link),
      mergeMap((url) => {
        const win = window.open(url, '_blank');

        if (!win) throw new Error('This browser does not support window.open');

        return interval(100).pipe(
          map(() => win.closed),
          filter((closed) => closed),
          take(1),
          tap(() => {
            this.getGitHubIntegration().subscribe((integration) => {
              console.log(integration);
            });
          }),
        );
      }),
    );
  }

  public postGitHubIntegration(installationId: string): Observable<void> {
    return this.apiService.post(`/integration/github`, {
      params: { installationId },
    });
  }

  public getGitHubIntegration(): Observable<GitIntegration> {
    return this.apiService.get('/integration/github');
  }

  public attachGitHubIntegration(projectId: number, repositoryName: string): Observable<void> {
    return this.apiService.post(`/project/${projectId}/integration/github`, {
      body: repositoryName,
    });
  }

  public getConnectedGitHubAccounts(): Observable<any> {
    return this.apiService.get('/user/integration/github');
  }

  // ----------------------------------------------------------------
  public deleteGitHubIntegration(projectId: number): Observable<void> {
    return this.apiService.delete(`/project/${projectId}/integration/github`);
  }

  public hasGitHubIntegration(projectId: number): Observable<boolean> {
    return of(true); // TODO: Implement logic for this feature
  }

  public gitHubIssueList(projectId: number) {
    return this.apiService.get(`/project/${projectId}/integration/github/issue`);
  }

  public connectGitHubIssue(projectId: number, taskId: number, issueNumber?: number) {
    if (issueNumber) {
      return this.apiService.post(
        `/project/${projectId}/task/${taskId}/integration/github/${issueNumber}`,
      );
    } else {
      return this.apiService.post(`/project/${projectId}/task/${taskId}/integration/github`);
    }
  }

  public disconnectGitHubIssue(projectId: number, taskId: number, issueNumber?: number) {
    return this.apiService.delete(`/project/${projectId}/task/${taskId}/integration/github`);
  }
}
