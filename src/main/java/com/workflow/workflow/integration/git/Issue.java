package com.workflow.workflow.integration.git;

/**
 * Object representing general git issue. Its common interface for various git
 * services.
 */
public class Issue {
    private long id;
    private String url;
    private String state;
    private String title;
    private String description;
    private String service;

    public Issue() {
    }

    public Issue(long id, String url, String title, String description, String service) {
        this.id = id;
        this.url = url;
        this.state = "open";
        this.title = title;
        this.description = description;
        this.service = service;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }
}
