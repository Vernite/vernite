import { JSONParsable } from './../../_main/interfaces/json-parsable.interface';

/** Interface to represent Git repository */
export interface GitRepository extends JSONParsable {
  /** Id of the repository */
  id: number;
  /** Full name of the repository (ex. @Vernite/frontend) */
  fullName: string;
  /** Flag if repository is private */
  private: boolean;
}

/** Interface to represent Git integration */
export interface GitIntegration extends JSONParsable {
  /** Link to Github integration page */
  link: string;
  /** List of repositories allowed with this integration */
  repositories: GitRepository[];
}

/** Interface to represent Git issue */
export interface GitIssue extends JSONParsable {
  /** Id of the issue */
  id: number;
  /** Issue url */
  url: string;
  /** Issue state */
  state: string;
  /** Issue title */
  title: string;
  /** Issue description */
  description: string;
  /** Issue service */
  service: string;
}

/** Interface to represent Git account */
export interface GitAccount extends JSONParsable {
  /** Id of the account */
  id: number;
  /** Account login */
  login: string;
  /** Account avatar url */
  avatarUrl: string;
}

/** Interface to represent Git pull request */
export interface GitPull extends JSONParsable {
  /** Id of the pull request */
  id: number;
  /** Pull request url */
  url: string;
  /** Pull request state */
  state: string;
  /** Pull request title */
  title: string;
  /** Pull request description */
  description: string;
  /** Pull request service */
  service: string;
  /** Pull request source branch */
  branch: string;
}
