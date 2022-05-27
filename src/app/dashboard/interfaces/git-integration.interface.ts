export interface GitRepository {
  id: number;
  fullName: string;
  private: boolean;
}

export interface GitIntegration {
  link: string;
  gitRepositories: GitRepository[];
}

export interface GitIssue {
  id: number;
  url: string;
  state: string;
  title: string;
  description: string;
  service: string;
}

export interface GitAccount {
  id: number;
  gitHubUsername: string;
  suspended: boolean;
}
