package com.workflow.workflow.integration.git.github.service;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GitHubWebhookData {
    private String action;
    private GitHubRepository repository;
    private List<GitHubRepository> repositories;
    private GitHubInstallationApi installation;
    private List<GitHubRepository> repositoriesRemoved;
    private GitHubIssue issue;

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public GitHubIssue getIssue() {
        return issue;
    }

    public void setIssue(GitHubIssue issue) {
        this.issue = issue;
    }

    @JsonProperty("repositories_removed")
    public List<GitHubRepository> getRepositoriesRemoved() {
        return repositoriesRemoved;
    }

    @JsonProperty("repositories_removed")
    public void setRepositoriesRemoved(List<GitHubRepository> repositoriesRemoved) {
        this.repositoriesRemoved = repositoriesRemoved;
    }

    public GitHubRepository getRepository() {
        return repository;
    }

    public void setRepository(GitHubRepository repository) {
        this.repository = repository;
    }

    public GitHubInstallationApi getInstallation() {
        return installation;
    }

    public void setInstallation(GitHubInstallationApi installation) {
        this.installation = installation;
    }

    public List<GitHubRepository> getRepositories() {
        return repositories;
    }

    public void setRepositories(List<GitHubRepository> repositories) {
        this.repositories = repositories;
    }
}
