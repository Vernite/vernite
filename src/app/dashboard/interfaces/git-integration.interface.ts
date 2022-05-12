export interface GitRepository {
  id: number;
  fullName: string;
  private: boolean;
}

export interface GitIntegration {
  link: string;
  gitRepositories: GitRepository[];
}
