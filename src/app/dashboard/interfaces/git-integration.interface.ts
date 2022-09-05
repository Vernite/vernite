import { JSONParsable } from './../../_main/interfaces/json-parsable.interface';

export interface GitRepository extends JSONParsable {
  id: number;
  fullName: string;
  private: boolean;
}

export interface GitIntegration extends JSONParsable {
  link: string;
  gitRepositories: GitRepository[];
}

export interface GitIssue extends JSONParsable {
  id: number;
  url: string;
  state: string;
  title: string;
  description: string;
  service: string;
}

export interface GitAccount extends JSONParsable {
  id: number;
  gitHubUsername: string;
  suspended: boolean;
}

export interface GitPull extends JSONParsable {
  id: number;
  url: string;
  state: string;
  title: string;
  description: string;
  service: string;
  branch: string;
}
