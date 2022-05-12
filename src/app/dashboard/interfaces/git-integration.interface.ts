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
  url: string;
  state: string;
  title: string;
  body: string;
  number: number;
}
